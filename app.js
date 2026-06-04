// ─── Countries ───────────────────────────────────────────────────────────────
const COUNTRIES = [
  {code:'af',name:'Afghanistan',flag:'🇦🇫'},{code:'al',name:'Albania',flag:'🇦🇱'},
  {code:'dz',name:'Algeria',flag:'🇩🇿'},{code:'ar',name:'Argentina',flag:'🇦🇷'},
  {code:'au',name:'Australia',flag:'🇦🇺'},{code:'at',name:'Austria',flag:'🇦🇹'},
  {code:'bh',name:'Bahrain',flag:'🇧🇭'},{code:'bd',name:'Bangladesh',flag:'🇧🇩'},
  {code:'be',name:'Belgium',flag:'🇧🇪'},{code:'bo',name:'Bolivia',flag:'🇧🇴'},
  {code:'ba',name:'Bosnia',flag:'🇧🇦'},{code:'br',name:'Brazil',flag:'🇧🇷'},
  {code:'bn',name:'Brunei',flag:'🇧🇳'},{code:'bg',name:'Bulgaria',flag:'🇧🇬'},
  {code:'kh',name:'Cambodia',flag:'🇰🇭'},{code:'ca',name:'Canada',flag:'🇨🇦'},
  {code:'cl',name:'Chile',flag:'🇨🇱'},{code:'cn',name:'China',flag:'🇨🇳'},
  {code:'co',name:'Colombia',flag:'🇨🇴'},{code:'cr',name:'Costa Rica',flag:'🇨🇷'},
  {code:'hr',name:'Croatia',flag:'🇭🇷'},{code:'cu',name:'Cuba',flag:'🇨🇺'},
  {code:'cy',name:'Cyprus',flag:'🇨🇾'},{code:'cz',name:'Czech Republic',flag:'🇨🇿'},
  {code:'dk',name:'Denmark',flag:'🇩🇰'},{code:'do',name:'Dominican Republic',flag:'🇩🇴'},
  {code:'ec',name:'Ecuador',flag:'🇪🇨'},{code:'eg',name:'Egypt',flag:'🇪🇬'},
  {code:'ee',name:'Estonia',flag:'🇪🇪'},{code:'et',name:'Ethiopia',flag:'🇪🇹'},
  {code:'fi',name:'Finland',flag:'🇫🇮'},{code:'fr',name:'France',flag:'🇫🇷'},
  {code:'ge',name:'Georgia',flag:'🇬🇪'},{code:'de',name:'Germany',flag:'🇩🇪'},
  {code:'gh',name:'Ghana',flag:'🇬🇭'},{code:'gr',name:'Greece',flag:'🇬🇷'},
  {code:'gt',name:'Guatemala',flag:'🇬🇹'},{code:'hn',name:'Honduras',flag:'🇭🇳'},
  {code:'hk',name:'Hong Kong',flag:'🇭🇰'},{code:'hu',name:'Hungary',flag:'🇭🇺'},
  {code:'is',name:'Iceland',flag:'🇮🇸'},{code:'in',name:'India',flag:'🇮🇳'},
  {code:'id',name:'Indonesia',flag:'🇮🇩'},{code:'ir',name:'Iran',flag:'🇮🇷'},
  {code:'iq',name:'Iraq',flag:'🇮🇶'},{code:'ie',name:'Ireland',flag:'🇮🇪'},
  {code:'il',name:'Israel',flag:'🇮🇱'},{code:'it',name:'Italy',flag:'🇮🇹'},
  {code:'jm',name:'Jamaica',flag:'🇯🇲'},{code:'jp',name:'Japan',flag:'🇯🇵'},
  {code:'jo',name:'Jordan',flag:'🇯🇴'},{code:'kz',name:'Kazakhstan',flag:'🇰🇿'},
  {code:'ke',name:'Kenya',flag:'🇰🇪'},{code:'kr',name:'South Korea',flag:'🇰🇷'},
  {code:'kw',name:'Kuwait',flag:'🇰🇼'},{code:'la',name:'Laos',flag:'🇱🇦'},
  {code:'lv',name:'Latvia',flag:'🇱🇻'},{code:'lb',name:'Lebanon',flag:'🇱🇧'},
  {code:'ly',name:'Libya',flag:'🇱🇾'},{code:'lt',name:'Lithuania',flag:'🇱🇹'},
  {code:'lu',name:'Luxembourg',flag:'🇱🇺'},{code:'mo',name:'Macau',flag:'🇲🇴'},
  {code:'my',name:'Malaysia',flag:'🇲🇾'},{code:'mv',name:'Maldives',flag:'🇲🇻'},
  {code:'mt',name:'Malta',flag:'🇲🇹'},{code:'mx',name:'Mexico',flag:'🇲🇽'},
  {code:'md',name:'Moldova',flag:'🇲🇩'},{code:'mn',name:'Mongolia',flag:'🇲🇳'},
  {code:'ma',name:'Morocco',flag:'🇲🇦'},{code:'mm',name:'Myanmar',flag:'🇲🇲'},
  {code:'np',name:'Nepal',flag:'🇳🇵'},{code:'nl',name:'Netherlands',flag:'🇳🇱'},
  {code:'nz',name:'New Zealand',flag:'🇳🇿'},{code:'ni',name:'Nicaragua',flag:'🇳🇮'},
  {code:'ng',name:'Nigeria',flag:'🇳🇬'},{code:'no',name:'Norway',flag:'🇳🇴'},
  {code:'om',name:'Oman',flag:'🇴🇲'},{code:'pk',name:'Pakistan',flag:'🇵🇰'},
  {code:'pa',name:'Panama',flag:'🇵🇦'},{code:'py',name:'Paraguay',flag:'🇵🇾'},
  {code:'pe',name:'Peru',flag:'🇵🇪'},{code:'ph',name:'Philippines',flag:'🇵🇭'},
  {code:'pl',name:'Poland',flag:'🇵🇱'},{code:'pt',name:'Portugal',flag:'🇵🇹'},
  {code:'qa',name:'Qatar',flag:'🇶🇦'},{code:'ro',name:'Romania',flag:'🇷🇴'},
  {code:'ru',name:'Russia',flag:'🇷🇺'},{code:'sa',name:'Saudi Arabia',flag:'🇸🇦'},
  {code:'rs',name:'Serbia',flag:'🇷🇸'},{code:'sg',name:'Singapore',flag:'🇸🇬'},
  {code:'sk',name:'Slovakia',flag:'🇸🇰'},{code:'si',name:'Slovenia',flag:'🇸🇮'},
  {code:'za',name:'South Africa',flag:'🇿🇦'},{code:'es',name:'Spain',flag:'🇪🇸'},
  {code:'lk',name:'Sri Lanka',flag:'🇱🇰'},{code:'se',name:'Sweden',flag:'🇸🇪'},
  {code:'ch',name:'Switzerland',flag:'🇨🇭'},{code:'tw',name:'Taiwan',flag:'🇹🇼'},
  {code:'tz',name:'Tanzania',flag:'🇹🇿'},{code:'th',name:'Thailand',flag:'🇹🇭'},
  {code:'tn',name:'Tunisia',flag:'🇹🇳'},{code:'tr',name:'Turkey',flag:'🇹🇷'},
  {code:'ae',name:'United Arab Emirates',flag:'🇦🇪'},{code:'gb',name:'United Kingdom',flag:'🇬🇧'},
  {code:'us',name:'United States',flag:'🇺🇸'},{code:'uy',name:'Uruguay',flag:'🇺🇾'},
  {code:'uz',name:'Uzbekistan',flag:'🇺🇿'},{code:'ve',name:'Venezuela',flag:'🇻🇪'},
  {code:'vn',name:'Vietnam',flag:'🇻🇳'},{code:'ye',name:'Yemen',flag:'🇾🇪'},
].sort((a,b) => a.name.localeCompare(b.name));

function getCountry(code) { return COUNTRIES.find(c => c.code === code); }
function tripCountryCodes(trip) { return (trip.countries || []).map(c => c.code); }

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

async function geocode(name, countryCodes = []) {
  const key = name + '|' + countryCodes.join(',');
  if (geocodeCache[key]) return geocodeCache[key];
  try {
    const cc = countryCodes.length ? `&countrycodes=${countryCodes.join(',')}` : '';
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name)}&format=json&limit=1&addressdetails=1${cc}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await res.json();
    if (data && data[0]) {
      const result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), display: data[0].display_name };
      geocodeCache[key] = result;
      return result;
    }
  } catch {}
  return null;
}

// Autocomplete search — returns up to 5 results
async function searchPlaces(query, countryCodes = []) {
  if (!query || query.length < 2) return [];
  try {
    const cc = countryCodes.length ? `&countrycodes=${countryCodes.join(',')}` : '';
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1${cc}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await res.json();
    return data.map(d => ({
      name: d.name || d.display_name.split(',')[0],
      display: d.display_name,
      lat: parseFloat(d.lat),
      lng: parseFloat(d.lon),
      type: d.type,
      category: d.class,
    }));
  } catch { return []; }
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

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>';

function initMap() {
  if (mapInstance) return;
  mapInstance = L.map('map').setView([20, 0], 2);
  L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 19 }).addTo(mapInstance);
}

// Mini-maps keyed by stop id
const miniMaps = {};

function initMiniMap(stopId, lat, lng) {
  const container = document.getElementById(`mini-map-${stopId}`);
  if (!container) return;
  container.classList.add('visible');

  if (miniMaps[stopId]) {
    miniMaps[stopId].setView([lat, lng], 14);
    miniMaps[stopId]._pin?.setLatLng([lat, lng]);
    return;
  }
  const m = L.map(container, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false });
  L.tileLayer(TILE_URL, { maxZoom: 19 }).addTo(m);
  m.setView([lat, lng], 14);
  const pin = L.marker([lat, lng]).addTo(m);
  m._pin = pin;
  miniMaps[stopId] = m;
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

  // Geocode all stops (use stored coords if available, else geocode with country filter)
  const cc = tripCountryCodes(trip);
  const geocoded = await Promise.all(allStops.map(async s => {
    if (s.lat && s.lng) return s;
    const geo = await geocode(s.name, cc);
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
        badge.textContent = `🚗 ${label}`;
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
        <div class="trip-item-dates">${tripDateRange(trip) || `${trip.days.length} day${trip.days.length !== 1 ? 's' : ''}`}${(trip.countries||[]).length ? ' · ' + trip.countries.map(c=>c.flag).join('') : ''}</div>
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
  const countryChips = (trip.countries || []).map(c => `<span class="trip-country-chip">${c.flag} ${c.name}</span>`).join('');
  document.getElementById('trip-dates-display').innerHTML =
    (tripDateRange(trip) ? `<span>${tripDateRange(trip)}</span>` : '') + (countryChips ? `<span style="display:flex;gap:4px;flex-wrap:wrap">${countryChips}</span>` : '');

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
  const stopCount = day.stops.length;
  const dayCost = day.stops.reduce((s, st) => s + (parseFloat(st.cost) || 0), 0);
  const costLabel = dayCost > 0 ? ` · ${formatCurrency(dayCost)}` : '';
  return `
    <div class="day-card" id="day-${day.id}">
      <div class="day-header">
        <div class="day-title-group">
          <span class="day-number">Day ${di + 1}</span>
          <input class="day-label-input" placeholder="e.g. Arrive in Paris" value="${escHtml(day.label || '')}" data-day="${day.id}" data-field="label" />
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
          <span style="font-size:12px;opacity:.75">${stopCount} stop${stopCount !== 1 ? 's' : ''}${costLabel}</span>
          <input type="date" class="day-date-input" value="${day.date || ''}" data-day="${day.id}" data-field="date" title="Set day date" />
          <button class="day-action-btn danger" onclick="deleteDay('${day.id}')" title="Delete day">🗑</button>
        </div>
      </div>
      <div class="day-body">
        <div class="stops-list" id="stops-${day.id}">
          ${day.stops.map((stop, si) => renderStopRow(stop, si, day.stops[si - 1])).join('')}
        </div>
        <div class="add-stop-area">
          <button class="add-stop-trigger" onclick="toggleAddPicker('${day.id}')">
            <span style="font-size:18px;line-height:1">+</span> Add a stop
          </button>
          <div class="add-stop-picker" id="picker-${day.id}">
            <button class="add-type-btn attraction" onclick="addStop('${day.id}','attraction');closeAddPicker('${day.id}')">📍 Attraction</button>
            <button class="add-type-btn hotel"      onclick="addStop('${day.id}','hotel');closeAddPicker('${day.id}')">🏨 Hotel</button>
            <button class="add-type-btn food"       onclick="addStop('${day.id}','food');closeAddPicker('${day.id}')">🍽️ Food</button>
            <button class="add-type-btn flight"     onclick="addStop('${day.id}','flight');closeAddPicker('${day.id}')">✈️ Flight</button>
            <button class="add-type-btn transport"  onclick="addStop('${day.id}','transport');closeAddPicker('${day.id}')">🚗 Transport</button>
            <button class="add-type-btn other"      onclick="addStop('${day.id}','other');closeAddPicker('${day.id}')">📌 Other</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleAddPicker(dayId) {
  const picker = document.getElementById(`picker-${dayId}`);
  if (picker) picker.classList.toggle('open');
}
function closeAddPicker(dayId) {
  const picker = document.getElementById(`picker-${dayId}`);
  if (picker) picker.classList.remove('open');
}

function renderStopRow(stop, si, prevStop) {
  // Travel time connector between stops
  const connector = prevStop ? `
    <div class="travel-connector">
      <div class="travel-connector-line"></div>
      <span class="travel-connector-badge loading" id="tt-${prevStop.id}-${stop.id}">⏱ …</span>
      <div class="travel-connector-line"></div>
    </div>` : '';

  const costLabel = stop.cost ? formatCurrency(stop.cost) : '+ Cost';
  const costClass = stop.cost ? '' : 'empty';
  const hasDetails = stop.note || stop.cost;
  const detailsOpen = hasDetails ? 'open' : '';

  const typeChoices = ['attraction','hotel','food','flight','transport','other'].map(t =>
    `<button class="type-choice-btn ${stop.type === t ? 'selected' : ''}" onclick="changeStopType('${stop.id}','${t}')">${stopTypeIcon(t)} ${t.charAt(0).toUpperCase()+t.slice(1)}</button>`
  ).join('');

  const hasMiniMap = stop.lat && stop.lng;

  return `
    ${connector}
    <div class="timeline-row" id="stop-${stop.id}">
      <div class="stop-time-col">
        <input type="time" class="stop-time-input" value="${stop.time || ''}" data-stop="${stop.id}" data-field="time" title="Set time" placeholder="--:--" />
        <div class="stop-dot ${stop.type}"></div>
        <div class="stop-vline"></div>
      </div>
      <div class="stop-card ${stop.type}">
        <div class="stop-card-top">
          <span class="stop-type-pill ${stop.type}">${stopTypeIcon(stop.type)} ${stop.type.charAt(0).toUpperCase()+stop.type.slice(1)}</span>
          <div class="stop-name-wrap">
            <input class="stop-name" placeholder="Search a place…" value="${escHtml(stop.name || '')}" data-stop="${stop.id}" data-field="name" autocomplete="off" />
            <div class="autocomplete-dropdown" id="ac-${stop.id}" style="display:none"></div>
          </div>
          <div class="stop-card-actions">
            <button class="stop-cost-badge ${costClass}" onclick="toggleStopDetails('${stop.id}')" title="Add cost / notes">${costLabel}</button>
            <button class="stop-expand-btn" onclick="toggleStopDetails('${stop.id}')" title="Expand details" id="expand-${stop.id}">⌄</button>
            <button class="stop-delete-btn" onclick="deleteStop('${stop.id}')" title="Remove">✕</button>
          </div>
        </div>
        <div id="mini-map-${stop.id}" class="stop-mini-map ${hasMiniMap ? 'visible' : ''}"></div>
        <div class="stop-details ${detailsOpen}" id="details-${stop.id}">
          <div class="stop-detail-row">
            <span class="stop-detail-label">Notes</span>
            <textarea class="stop-note" rows="2" placeholder="Address, booking ref, tips…" data-stop="${stop.id}" data-field="note">${escHtml(stop.note || '')}</textarea>
          </div>
          <div class="stop-detail-row">
            <span class="stop-detail-label">Cost $</span>
            <input type="number" class="stop-cost-input" placeholder="0.00" value="${stop.cost || ''}" min="0" step="0.01" data-stop="${stop.id}" data-field="cost" />
          </div>
          <div class="stop-detail-row" style="align-items:flex-start">
            <span class="stop-detail-label">Type</span>
            <div class="stop-type-chooser">${typeChoices}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Place helper functions ───────────────────────────────────────────────────
function selectPlace(stop, item, nameInput, acDropdown) {
  const name = item.dataset.name;
  const lat  = parseFloat(item.dataset.lat);
  const lng  = parseFloat(item.dataset.lng);
  nameInput.value = name;
  stop.name = name;
  stop.lat  = lat;
  stop.lng  = lng;
  saveState();
  acDropdown.style.display = 'none';
  // Show mini map
  const miniMapEl = document.getElementById(`mini-map-${stop.id}`);
  if (miniMapEl) {
    miniMapEl.classList.add('visible');
    setTimeout(() => initMiniMap(stop.id, lat, lng), 60);
  }
  // Cache geocode result
  geocodeCache[name + '|'] = { lat, lng };
}

function placeIcon(category, type) {
  if (category === 'amenity') {
    if (['restaurant','cafe','fast_food','food_court'].includes(type)) return '🍽️';
    if (['hotel','motel','hostel','guest_house'].includes(type)) return '🏨';
    if (['museum','theatre','cinema','arts_centre'].includes(type)) return '🏛️';
    if (['place_of_worship'].includes(type)) return '⛪';
    if (['hospital','clinic'].includes(type)) return '🏥';
    if (['airport'].includes(type)) return '✈️';
  }
  if (category === 'tourism') {
    if (['attraction','viewpoint','artwork'].includes(type)) return '📍';
    if (['hotel','motel','hostel'].includes(type)) return '🏨';
    if (['museum'].includes(type)) return '🏛️';
    if (['beach'].includes(type)) return '🏖️';
  }
  if (category === 'natural') return '🌿';
  if (category === 'railway' || category === 'aeroway') return '🚉';
  if (category === 'highway') return '🛣️';
  if (category === 'place') return '📍';
  if (category === 'boundary' || category === 'administrative') return '🏙️';
  return '📌';
}

function shortAddress(display) {
  // Keep only the last 2-3 meaningful parts (city, country)
  const parts = display.split(',').map(s => s.trim()).filter(Boolean);
  return parts.slice(-3).join(', ');
}

function toggleStopDetails(stopId) {
  const details = document.getElementById(`details-${stopId}`);
  const btn = document.getElementById(`expand-${stopId}`);
  if (!details) return;
  const open = details.classList.toggle('open');
  if (btn) btn.textContent = open ? '⌃' : '⌄';
  if (open) details.querySelector('textarea')?.focus();
}

function changeStopType(stopId, newType) {
  const trip = state.activeTrip;
  if (!trip) return;
  for (const day of trip.days) {
    const stop = day.stops.find(s => s.id === stopId);
    if (stop) { stop.type = newType; saveState(); break; }
  }
  renderDays();
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

  // — Autocomplete on name input —
  const nameInput = el.querySelector('.stop-name');
  const acDropdown = document.getElementById(`ac-${stop.id}`);
  let acTimer = null;
  let acFocusIdx = -1;

  if (nameInput && acDropdown) {
    nameInput.addEventListener('input', () => {
      clearTimeout(acTimer);
      const q = nameInput.value.trim();
      if (!q || q.length < 2) { acDropdown.style.display = 'none'; return; }
      acDropdown.style.display = 'block';
      acDropdown.innerHTML = '<div class="autocomplete-searching">🔍 Searching…</div>';
      acTimer = setTimeout(async () => {
        const cc = tripCountryCodes(state.activeTrip);
        const results = await searchPlaces(q, cc);
        if (!results.length) { acDropdown.style.display = 'none'; return; }
        acFocusIdx = -1;
        acDropdown.innerHTML = results.map((r, i) => `
          <div class="autocomplete-item" data-idx="${i}" data-lat="${r.lat}" data-lng="${r.lng}" data-name="${escHtml(r.name)}" data-display="${escHtml(r.display)}">
            <span class="autocomplete-item-icon">${placeIcon(r.category, r.type)}</span>
            <div class="autocomplete-item-text">
              <div class="autocomplete-item-name">${escHtml(r.name)}</div>
              <div class="autocomplete-item-sub">${escHtml(shortAddress(r.display))}</div>
            </div>
          </div>`).join('');
        acDropdown.querySelectorAll('.autocomplete-item').forEach(item => {
          item.addEventListener('mousedown', e => {
            e.preventDefault();
            selectPlace(stop, item, nameInput, acDropdown);
          });
        });
      }, 380);
    });

    nameInput.addEventListener('keydown', e => {
      const items = acDropdown.querySelectorAll('.autocomplete-item');
      if (!items.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); acFocusIdx = Math.min(acFocusIdx+1, items.length-1); items.forEach((it,i)=>it.classList.toggle('focused',i===acFocusIdx)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); acFocusIdx = Math.max(acFocusIdx-1, 0); items.forEach((it,i)=>it.classList.toggle('focused',i===acFocusIdx)); }
      if (e.key === 'Enter' && acFocusIdx >= 0) { e.preventDefault(); selectPlace(stop, items[acFocusIdx], nameInput, acDropdown); }
      if (e.key === 'Escape') acDropdown.style.display = 'none';
    });

    nameInput.addEventListener('blur', () => { setTimeout(() => { acDropdown.style.display = 'none'; }, 200); });
  }

  // Init mini-map if stop already has coords
  if (stop.lat && stop.lng) {
    setTimeout(() => initMiniMap(stop.id, stop.lat, stop.lng), 50);
  }

  el.querySelectorAll('[data-stop]').forEach(input => {
    const ev = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(ev, () => {
      stop[input.dataset.field] = input.value;
      saveState();
      if (input.dataset.field === 'cost') {
        // Update cost badge live
        const badge = document.querySelector(`#stop-${stop.id} .stop-cost-badge`);
        if (badge) {
          badge.textContent = stop.cost ? formatCurrency(stop.cost) : '+ Cost';
          badge.className = `stop-cost-badge ${stop.cost ? '' : 'empty'}`;
        }
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

// ─── Country picker state (for new trip modal) ────────────────────────────────
let pickerSelectedCountries = []; // array of {code, name, flag}

function openNewTripModal() {
  pickerSelectedCountries = [];
  openModal('New Trip', `
    <div class="form-group">
      <label>Trip Name *</label>
      <input id="new-trip-name" placeholder="e.g. Europe Summer 2025" autofocus />
    </div>
    <div class="form-group">
      <label>Countries / Destinations</label>
      <div class="country-picker-wrap">
        <div class="country-tags" id="country-tags" onclick="document.getElementById('country-search').focus()">
          <input id="country-search" class="country-search-input" placeholder="Search country…" autocomplete="off" />
        </div>
        <div class="country-dropdown" id="country-dropdown"></div>
      </div>
      <span style="font-size:11px;color:#9ca3af">Add one or more countries — helps filter place searches on the map</span>
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
      <button class="btn btn-primary" onclick="createTrip()">Create Trip ✈️</button>
    </div>
  `);

  setTimeout(() => {
    document.getElementById('new-trip-name')?.focus();
    initCountryPicker();
  }, 50);

  // Auto-fill days from date range
  const start = document.getElementById('new-trip-start');
  const end   = document.getElementById('new-trip-end');
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

function initCountryPicker() {
  const searchInput = document.getElementById('country-search');
  const dropdown    = document.getElementById('country-dropdown');
  const tagsEl      = document.getElementById('country-tags');
  if (!searchInput || !dropdown) return;

  function renderTags() {
    // Remove old tags (keep input)
    tagsEl.querySelectorAll('.country-tag').forEach(t => t.remove());
    pickerSelectedCountries.forEach(c => {
      const tag = document.createElement('span');
      tag.className = 'country-tag';
      tag.innerHTML = `${c.flag} ${c.name} <button class="country-tag-remove" onclick="removePickerCountry('${c.code}')">✕</button>`;
      tagsEl.insertBefore(tag, searchInput);
    });
  }

  function renderDropdown(q) {
    const matches = COUNTRIES
      .filter(c => c.name.toLowerCase().includes(q.toLowerCase()) && !pickerSelectedCountries.find(s => s.code === c.code))
      .slice(0, 8);
    if (!matches.length) { dropdown.classList.remove('open'); return; }
    dropdown.innerHTML = matches.map(c =>
      `<div class="country-option" onclick="addPickerCountry('${c.code}')">
         <span class="country-flag">${c.flag}</span> ${c.name}
       </div>`
    ).join('');
    dropdown.classList.add('open');
  }

  searchInput.addEventListener('input', () => renderDropdown(searchInput.value));
  searchInput.addEventListener('focus', () => { if (searchInput.value) renderDropdown(searchInput.value); });
  searchInput.addEventListener('blur', () => setTimeout(() => dropdown.classList.remove('open'), 150));

  // expose render for add/remove
  window._renderPickerTags = renderTags;
  window._renderPickerDropdown = renderDropdown;
  renderTags();
}

function addPickerCountry(code) {
  const c = getCountry(code);
  if (!c || pickerSelectedCountries.find(s => s.code === code)) return;
  pickerSelectedCountries.push(c);
  const searchInput = document.getElementById('country-search');
  if (searchInput) searchInput.value = '';
  window._renderPickerTags?.();
  window._renderPickerDropdown?.('');
}

function removePickerCountry(code) {
  pickerSelectedCountries = pickerSelectedCountries.filter(c => c.code !== code);
  window._renderPickerTags?.();
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

  const trip = { id: uid(), name, days, countries: pickerSelectedCountries };
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
