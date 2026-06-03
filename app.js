// ─── State ───────────────────────────────────────────────────────────────────
let state = {
  trips: [],
  activeTrip: null,
};

// ─── Storage ─────────────────────────────────────────────────────────────────
function saveState() {
  localStorage.setItem('tripcraft_v1', JSON.stringify(state.trips));
}

function loadState() {
  try {
    const raw = localStorage.getItem('tripcraft_v1');
    state.trips = raw ? JSON.parse(raw) : [];
  } catch {
    state.trips = [];
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function formatCurrency(n) {
  if (!n || isNaN(n)) return '—';
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function stopTypeIcon(type) {
  const icons = { hotel: '🏨', flight: '✈️', food: '🍽️', attraction: '📍', transport: '🚗', other: '📌' };
  return icons[type] || '📌';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function tripDateRange(trip) {
  const dates = trip.days.map(d => d.date).filter(Boolean).sort();
  if (!dates.length) return '';
  if (dates.length === 1) return formatDate(dates[0]);
  return `${formatDate(dates[0])} – ${formatDate(dates[dates.length - 1])}`;
}

// ─── Geocoding (Nominatim) ────────────────────────────────────────────────────
const geocodeCache = {};

async function geocode(name) {
  if (geocodeCache[name]) return geocodeCache[name];
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name)}&format=json&limit=1`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await res.json();
    if (data && data[0]) {
      const result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), display: data[0].display_name };
      geocodeCache[name] = result;
      return result;
    }
  } catch {}
  return null;
}

// ─── Travel Time (OSRM public API) ───────────────────────────────────────────
const travelTimeCache = {};

async function getTravelTime(from, to) {
  const key = `${from.lat},${from.lng}|${to.lat},${to.lng}`;
  if (travelTimeCache[key]) return travelTimeCache[key];
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes && data.routes[0]) {
      const secs = data.routes[0].duration;
      const dist = data.routes[0].distance;
      const mins = Math.round(secs / 60);
      const km = (dist / 1000).toFixed(1);
      const label = mins < 60
        ? `~${mins} min drive (${km} km)`
        : `~${Math.floor(mins / 60)}h ${mins % 60}m drive (${km} km)`;
      travelTimeCache[key] = label;
      return label;
    }
  } catch {}
  return null;
}

// ─── Map ─────────────────────────────────────────────────────────────────────
let mapInstance = null;
let routeControl = null;
let mapMarkers = [];

function initMap() {
  if (mapInstance) return;
  mapInstance = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(mapInstance);
}

async function refreshMap() {
  initMap();
  const trip = state.activeTrip;
  if (!trip) return;

  // Clear old markers & routes
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];
  if (routeControl) { routeControl.remove(); routeControl = null; }

  // Collect all stops with names
  const allStops = trip.days.flatMap((day, di) =>
    day.stops.map((stop, si) => ({ ...stop, dayIndex: di, stopIndex: si, dayLabel: day.label || `Day ${di + 1}` }))
  ).filter(s => s.name && s.name.trim());

  if (!allStops.length) return;

  // Geocode all stops
  const geocoded = await Promise.all(allStops.map(async s => {
    const geo = await geocode(s.name);
    return geo ? { ...s, lat: geo.lat, lng: geo.lng } : null;
  }));
  const valid = geocoded.filter(Boolean);
  if (!valid.length) return;

  // Add markers
  const colors = ['#2563eb','#7c3aed','#db2777','#ea580c','#16a34a','#0891b2'];
  valid.forEach((s, i) => {
    const color = colors[s.dayIndex % colors.length];
    const icon = L.divIcon({
      className: '',
      html: `<div style="background:${color};color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)">${i + 1}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
    const marker = L.marker([s.lat, s.lng], { icon })
      .addTo(mapInstance)
      .bindPopup(`<b>${s.name}</b><br><span style="color:#666;font-size:12px">${s.dayLabel} · ${stopTypeIcon(s.type)} ${s.type}</span>${s.time ? `<br>🕐 ${s.time}` : ''}${s.cost ? `<br>💰 ${formatCurrency(s.cost)}` : ''}`);
    mapMarkers.push(marker);
  });

  // Fit map to markers
  const bounds = L.latLngBounds(valid.map(s => [s.lat, s.lng]));
  mapInstance.fitBounds(bounds, { padding: [40, 40] });

  // Draw route if toggle is on
  const showRoute = document.getElementById('show-route-toggle');
  if (showRoute && showRoute.checked && valid.length > 1) {
    routeControl = L.Routing.control({
      waypoints: valid.map(s => L.latLng(s.lat, s.lng)),
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      show: false,
      lineOptions: { styles: [{ color: '#2563eb', weight: 3, opacity: 0.7, dashArray: '6,6' }] },
      createMarker: () => null,
    }).addTo(mapInstance);
  }
}

// ─── Travel Time Badges ───────────────────────────────────────────────────────
async function refreshTravelTimes(trip) {
  for (let di = 0; di < trip.days.length; di++) {
    const day = trip.days[di];
    const namedStops = day.stops.filter(s => s.name && s.name.trim());
    if (namedStops.length < 2) continue;

    for (let si = 0; si < namedStops.length - 1; si++) {
      const a = namedStops[si];
      const b = namedStops[si + 1];
      const [geoA, geoB] = await Promise.all([geocode(a.name), geocode(b.name)]);
      if (!geoA || !geoB) continue;
      const label = await getTravelTime(geoA, geoB);
      if (!label) continue;

      // Find badge element and update
      const badge = document.getElementById(`tt-${a.id}-${b.id}`);
      if (badge) {
        badge.textContent = `🚗 ${label} to next stop`;
        badge.classList.remove('loading');
      }
    }
  }
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderSidebar() {
  const container = document.getElementById('trips-container');
  if (!state.trips.length) {
    container.innerHTML = '<div style="font-size:13px;color:#9ca3af;padding:8px">No trips yet</div>';
    return;
  }
  container.innerHTML = state.trips.map(trip => `
    <div class="trip-item ${state.activeTrip?.id === trip.id ? 'active' : ''}" onclick="selectTrip('${trip.id}')">
      <div class="trip-item-left">
        <div class="trip-item-name">${trip.name || 'Unnamed Trip'}</div>
        <div class="trip-item-dates">${tripDateRange(trip) || `${trip.days.length} day${trip.days.length !== 1 ? 's' : ''}`}</div>
      </div>
      <button class="trip-delete-btn" onclick="event.stopPropagation();deleteTrip('${trip.id}')" title="Delete trip">🗑</button>
    </div>
  `).join('');
}

function renderTripView() {
  const trip = state.activeTrip;
  if (!trip) {
    document.getElementById('empty-state').classList.remove('hidden');
    document.getElementById('trip-view').classList.add('hidden');
    return;
  }
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('trip-view').classList.remove('hidden');

  document.getElementById('trip-name-display').textContent = trip.name;
  document.getElementById('trip-dates-display').textContent = tripDateRange(trip);

  const totalBudget = trip.days.flatMap(d => d.stops).reduce((s, st) => s + (parseFloat(st.cost) || 0), 0);
  document.getElementById('trip-budget-summary').textContent = totalBudget > 0 ? `Est. ${formatCurrency(totalBudget)}` : '';

  renderDays();
  renderBudget();
  renderSummary();

  // Refresh map if that tab is active
  const mapTab = document.getElementById('tab-map');
  if (mapTab && mapTab.classList.contains('active')) {
    setTimeout(refreshMap, 100);
  }
}

function renderDays() {
  const trip = state.activeTrip;
  const container = document.getElementById('days-container');
  container.innerHTML = trip.days.map((day, di) => renderDayCard(day, di)).join('');
  // Attach events after render
  trip.days.forEach((day, di) => {
    attachDayEvents(day, di);
    day.stops.forEach((stop, si) => attachStopEvents(day, di, stop, si));
  });
  // Refresh travel times async
  setTimeout(() => refreshTravelTimes(trip), 500);
}

function renderDayCard(day, di) {
  return `
    <div class="day-card" id="day-${day.id}">
      <div class="day-header">
        <div class="day-title-group">
          <span class="day-number">Day ${di + 1}</span>
          <input class="day-label-input" placeholder="e.g. Arrive in Paris" value="${escHtml(day.label || '')}" data-day="${day.id}" data-field="label" />
        </div>
        <input type="date" class="day-date-input" value="${day.date || ''}" data-day="${day.id}" data-field="date" title="Set day date" />
        <div class="day-actions">
          <button class="day-action-btn danger" onclick="deleteDay('${day.id}')" title="Delete day">🗑</button>
        </div>
      </div>
      <div class="day-body">
        <div class="stops-list" id="stops-${day.id}">
          ${day.stops.map((stop, si) => renderStopItem(stop, si, day.stops[si - 1])).join('')}
        </div>
        <div class="add-stop-row">
          <button class="btn btn-outline btn-sm add-stop-btn" onclick="addStop('${day.id}','attraction')">📍 Attraction</button>
          <button class="btn btn-outline btn-sm add-stop-btn" onclick="addStop('${day.id}','hotel')">🏨 Hotel</button>
          <button class="btn btn-outline btn-sm add-stop-btn" onclick="addStop('${day.id}','food')">🍽 Food</button>
          <button class="btn btn-outline btn-sm add-stop-btn" onclick="addStop('${day.id}','flight')">✈️ Flight</button>
          <button class="btn btn-outline btn-sm add-stop-btn" onclick="addStop('${day.id}','transport')">🚗 Transport</button>
        </div>
      </div>
    </div>
  `;
}

function renderStopItem(stop, si, prevStop) {
  const showTtBadge = prevStop ? `<span class="travel-time-badge loading" id="tt-${prevStop.id}-${stop.id}">🚗 Calculating...</span>` : '';
  return `
    <div class="stop-item" id="stop-${stop.id}">
      <div class="stop-icon ${stop.type}">${stopTypeIcon(stop.type)}</div>
      <div class="stop-body">
        <div class="stop-name-row">
          <input class="stop-name" placeholder="Place name…" value="${escHtml(stop.name || '')}" data-stop="${stop.id}" data-field="name" />
          <input type="time" class="stop-time-input" value="${stop.time || ''}" data-stop="${stop.id}" data-field="time" title="Time" />
          <select class="stop-type-select" data-stop="${stop.id}" data-field="type">
            <option value="attraction" ${stop.type === 'attraction' ? 'selected' : ''}>📍 Attraction</option>
            <option value="hotel" ${stop.type === 'hotel' ? 'selected' : ''}>🏨 Hotel</option>
            <option value="food" ${stop.type === 'food' ? 'selected' : ''}>🍽 Food</option>
            <option value="flight" ${stop.type === 'flight' ? 'selected' : ''}>✈️ Flight</option>
            <option value="transport" ${stop.type === 'transport' ? 'selected' : ''}>🚗 Transport</option>
            <option value="other" ${stop.type === 'other' ? 'selected' : ''}>📌 Other</option>
          </select>
        </div>
        <textarea class="stop-note" rows="1" placeholder="Notes (address, booking ref, tips…)" data-stop="${stop.id}" data-field="note">${escHtml(stop.note || '')}</textarea>
        <div class="stop-cost-row">
          <span class="stop-cost-label">Cost (USD)</span>
          <input type="number" class="stop-cost-input" placeholder="0" value="${stop.cost || ''}" min="0" step="0.01" data-stop="${stop.id}" data-field="cost" />
        </div>
        ${showTtBadge}
      </div>
      <button class="stop-delete-btn" onclick="deleteStop('${stop.id}')" title="Remove stop">✕</button>
    </div>
  `;
}

function attachDayEvents(day, di) {
  const card = document.getElementById(`day-${day.id}`);
  if (!card) return;
  card.querySelectorAll('[data-day]').forEach(el => {
    el.addEventListener('input', () => {
      day[el.dataset.field] = el.value;
      saveState();
      if (el.dataset.field === 'date') {
        renderSidebar();
        document.getElementById('trip-dates-display').textContent = tripDateRange(state.activeTrip);
      }
    });
  });
}

function attachStopEvents(day, di, stop, si) {
  const el = document.getElementById(`stop-${stop.id}`);
  if (!el) return;
  el.querySelectorAll('[data-stop]').forEach(input => {
    const ev = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(ev, () => {
      stop[input.dataset.field] = input.value;
      saveState();
      if (input.dataset.field === 'cost') {
        renderBudget();
        document.getElementById('trip-budget-summary').textContent =
          (() => { const t = state.activeTrip.days.flatMap(d => d.stops).reduce((s, st) => s + (parseFloat(st.cost) || 0), 0); return t > 0 ? `Est. ${formatCurrency(t)}` : ''; })();
      }
      if (input.dataset.field === 'type') {
        const icon = el.querySelector('.stop-icon');
        icon.className = `stop-icon ${stop.type}`;
        icon.textContent = stopTypeIcon(stop.type);
      }
      if (input.dataset.field === 'name') {
        renderSummary();
      }
    });
  });
}

function renderBudget() {
  const trip = state.activeTrip;
  if (!trip) return;
  let grandTotal = 0;

  const breakdown = trip.days.map((day, di) => {
    const stopsWithCost = day.stops.filter(s => parseFloat(s.cost) > 0);
    const dayTotal = stopsWithCost.reduce((s, st) => s + (parseFloat(st.cost) || 0), 0);
    grandTotal += dayTotal;
    if (!stopsWithCost.length) return '';
    return `
      <div class="budget-day-block">
        <div class="budget-day-title">Day ${di + 1}${day.label ? ' – ' + escHtml(day.label) : ''}${day.date ? ` (${formatDate(day.date)})` : ''}</div>
        ${stopsWithCost.map(s => `
          <div class="budget-stop-row">
            <span class="budget-stop-name">${stopTypeIcon(s.type)} ${escHtml(s.name || 'Unnamed')}</span>
            <span class="budget-stop-cost">${formatCurrency(s.cost)}</span>
          </div>
        `).join('')}
        <div class="budget-day-total">Day total: ${formatCurrency(dayTotal)}</div>
      </div>
    `;
  }).join('');

  document.getElementById('budget-total').textContent = formatCurrency(grandTotal);
  const days = trip.days.length || 1;
  document.getElementById('budget-per-day').textContent = formatCurrency(grandTotal / days);
  document.getElementById('budget-breakdown').innerHTML = breakdown || '<div style="color:#9ca3af;font-size:13px">No costs added yet. Add a cost to any stop in the itinerary.</div>';
}

function renderSummary() {
  const trip = state.activeTrip;
  if (!trip) return;
  const totalCost = trip.days.flatMap(d => d.stops).reduce((s, st) => s + (parseFloat(st.cost) || 0), 0);
  const totalStops = trip.days.flatMap(d => d.stops).filter(s => s.name).length;

  document.getElementById('summary-content').innerHTML = `
    <div class="summary-section">
      <h3>Trip Overview</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-bottom:8px">
        ${card('📅', 'Duration', `${trip.days.length} day${trip.days.length !== 1 ? 's' : ''}`)}
        ${card('📍', 'Total Stops', `${totalStops}`)}
        ${card('💰', 'Estimated Cost', formatCurrency(totalCost))}
        ${card('📆', 'Dates', tripDateRange(trip) || '—')}
      </div>
    </div>
    <div class="summary-section">
      <h3>Day-by-Day Itinerary</h3>
      ${trip.days.map((day, di) => `
        <div class="summary-day">
          <div class="summary-day-title">Day ${di + 1}${day.label ? ' – ' + escHtml(day.label) : ''}${day.date ? ` &nbsp;·&nbsp; ${formatDate(day.date)}` : ''}</div>
          ${day.stops.length ? day.stops.map(s => `
            <div class="summary-stop-row">
              <span class="summary-stop-time">${s.time || '—'}</span>
              <span class="summary-stop-icon">${stopTypeIcon(s.type)}</span>
              <span class="summary-stop-name">${escHtml(s.name || 'Unnamed')}${s.note ? `<br><span style="color:#9ca3af;font-size:11px">${escHtml(s.note)}</span>` : ''}</span>
              <span class="summary-stop-cost">${s.cost ? formatCurrency(s.cost) : ''}</span>
            </div>
          `).join('') : '<div style="color:#9ca3af;font-size:13px;padding:8px 0">No stops added yet</div>'}
        </div>
      `).join('')}
    </div>
  `;
}

function card(icon, label, value) {
  return `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px;text-align:center">
    <div style="font-size:22px;margin-bottom:4px">${icon}</div>
    <div style="font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">${label}</div>
    <div style="font-size:16px;font-weight:700;margin-top:4px">${value}</div>
  </div>`;
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── Actions ──────────────────────────────────────────────────────────────────
function selectTrip(id) {
  state.activeTrip = state.trips.find(t => t.id === id) || null;
  renderSidebar();
  renderTripView();
  // Activate default tab
  switchTab('itinerary');
}

function deleteTrip(id) {
  if (!confirm('Delete this trip? This cannot be undone.')) return;
  state.trips = state.trips.filter(t => t.id !== id);
  if (state.activeTrip?.id === id) state.activeTrip = state.trips[0] || null;
  saveState();
  renderSidebar();
  renderTripView();
}

function addDay() {
  const trip = state.activeTrip;
  if (!trip) return;
  const day = { id: uid(), label: '', date: '', stops: [] };
  trip.days.push(day);
  saveState();
  renderDays();
  renderBudget();
  renderSummary();
  // Scroll to new day
  setTimeout(() => {
    const el = document.getElementById(`day-${day.id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function deleteDay(dayId) {
  const trip = state.activeTrip;
  if (!trip) return;
  if (trip.days.length === 1) { alert('A trip needs at least one day.'); return; }
  trip.days = trip.days.filter(d => d.id !== dayId);
  saveState();
  renderDays();
  renderBudget();
  renderSummary();
}

function addStop(dayId, type = 'attraction') {
  const trip = state.activeTrip;
  if (!trip) return;
  const day = trip.days.find(d => d.id === dayId);
  if (!day) return;
  const stop = { id: uid(), name: '', type, time: '', note: '', cost: '' };
  day.stops.push(stop);
  saveState();
  renderDays();
  // Focus the new stop's name input
  setTimeout(() => {
    const el = document.getElementById(`stop-${stop.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      el.querySelector('.stop-name')?.focus();
    }
  }, 50);
}

function deleteStop(stopId) {
  const trip = state.activeTrip;
  if (!trip) return;
  for (const day of trip.days) {
    day.stops = day.stops.filter(s => s.id !== stopId);
  }
  saveState();
  renderDays();
  renderBudget();
  renderSummary();
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.toggle('active', t.id === `tab-${name}`));
  if (name === 'map') {
    setTimeout(() => {
      if (mapInstance) mapInstance.invalidateSize();
      refreshMap();
    }, 100);
  }
  if (name === 'budget') renderBudget();
  if (name === 'summary') renderSummary();
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function openModal(title, bodyHtml) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function openNewTripModal() {
  openModal('New Trip', `
    <div class="form-group">
      <label>Trip Name *</label>
      <input id="new-trip-name" placeholder="e.g. Europe Summer 2025" autofocus />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Date</label>
        <input type="date" id="new-trip-start" />
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="date" id="new-trip-end" />
      </div>
    </div>
    <div class="form-group">
      <label>Number of Days</label>
      <input type="number" id="new-trip-days" value="3" min="1" max="60" />
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="createTrip()">Create Trip</button>
    </div>
  `);
  setTimeout(() => document.getElementById('new-trip-name')?.focus(), 50);

  // Auto-fill days from date range
  const start = document.getElementById('new-trip-start');
  const end = document.getElementById('new-trip-end');
  const daysInput = document.getElementById('new-trip-days');
  function updateDays() {
    if (start.value && end.value) {
      const diff = Math.round((new Date(end.value) - new Date(start.value)) / 86400000) + 1;
      if (diff > 0) daysInput.value = diff;
    }
  }
  start?.addEventListener('change', updateDays);
  end?.addEventListener('change', updateDays);
}

function createTrip() {
  const name = document.getElementById('new-trip-name')?.value.trim();
  if (!name) { alert('Please enter a trip name.'); return; }
  const numDays = Math.max(1, parseInt(document.getElementById('new-trip-days')?.value) || 1);
  const startDate = document.getElementById('new-trip-start')?.value;

  const days = Array.from({ length: numDays }, (_, i) => {
    let date = '';
    if (startDate) {
      const d = new Date(startDate + 'T00:00:00');
      d.setDate(d.getDate() + i);
      date = d.toISOString().split('T')[0];
    }
    return { id: uid(), label: '', date, stops: [] };
  });

  const trip = { id: uid(), name, days };
  state.trips.unshift(trip);
  state.activeTrip = trip;
  saveState();
  closeModal();
  renderSidebar();
  renderTripView();
  switchTab('itinerary');
}

function printSummary() {
  switchTab('summary');
  setTimeout(() => window.print(), 200);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // Tab nav
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // New trip button
  document.getElementById('new-trip-btn').addEventListener('click', openNewTripModal);

  // Add day button
  document.getElementById('add-day-btn').addEventListener('click', addDay);

  // Map route toggle
  document.getElementById('show-route-toggle')?.addEventListener('change', refreshMap);

  // Close modal on overlay click
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Restore last active trip
  if (state.trips.length) {
    state.activeTrip = state.trips[0];
  }

  renderSidebar();
  renderTripView();
});
