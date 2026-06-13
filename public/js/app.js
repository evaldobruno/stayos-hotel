// StayOS frontend — i18n (EN/NL), auth, live data from the API
const I18N = {
  en: {
    sec_ops:'Operations', sec_biz:'Business',
    nav_dashboard:'Dashboard', nav_rooms:'Room Map', nav_reservations:'Reservations',
    nav_requests:'Requests', nav_housekeeping:'Housekeeping', nav_maintenance:'Maintenance',
    nav_crm:'Guest CRM', nav_more:'More modules',
    sub_dashboard:'Real-time operational overview', sub_rooms:'30 rooms · 3 floors · live status',
    sub_reservations:'All reservations and channels', sub_requests:'Guest service requests',
    sub_housekeeping:'Cleaning by priority', sub_maintenance:'Issues and priorities',
    sub_crm:'Profiles, preferences and segments', sub_more:'Coming in the next phases',
    email:'Email', password:'Password', signin:'Sign in', logout:'Logout',
    kpi_occ:'Occupancy', kpi_adr:'ADR (avg. rate)', kpi_revpar:'RevPAR', kpi_rev:'Revenue (period)',
    op_status:'Operational status', arrivals:'Upcoming arrivals', satisfaction:'Satisfaction',
    by_channel:'Reservations by channel', no_data:'No data',
    available:'Available', occupied:'Occupied', reserved:'Reserved', cleaning:'Cleaning',
    maintenance:'Maintenance', blocked:'Blocked',
    th_booking:'Booking', th_guest:'Guest', th_channel:'Channel', th_room:'Room',
    th_checkin:'Check-in', th_checkout:'Check-out', th_pax:'Pax', th_amount:'Amount', th_status:'Status',
    th_segment:'Segment', th_stays:'Stays', th_spent:'Total spent', th_category:'Category',
    th_request:'Request', th_dept:'Department', th_assigned:'Assigned to', th_priority:'Priority',
    th_issue:'Issue', th_location:'Location', th_source:'Source', th_type:'Type', th_notes:'Notes',
    all_channels:'All channels', all_status:'All statuses', search_guest:'Search guest…',
    rooms:'rooms', floor:'Floor', preferences:'Preferences', history:'History', profile:'Profile',
    more_soon:'Billing, Reviews, Automated messaging and the Guest Portal arrive in Phase 3.',
    sec_admin:'Administration', nav_settings:'Settings', sub_settings:'Hotel data and user management',
    set_hotel:'Hotel details', set_name:'Name', set_city:'City', set_country:'Country', set_currency:'Currency',
    set_users:'Users & access', add_user:'Add user', save:'Save', saved:'Saved ✓',
    th_name:'Name', th_email:'Email', th_role:'Role', th_active:'Active', th_actions:'Actions',
    reset_pw:'Reset password', deactivate:'Deactivate', activate:'Activate', del:'Delete',
    new_password:'New password', confirm_del:'Delete this user?', admin_only:'Administrators only.',
    role_admin:'Administrator', role_manager:'Manager', role_reception:'Reception',
    role_housekeeping:'Housekeeping', role_maintenance:'Maintenance', role_finance:'Finance',
    // statuses
    s_new:'New', s_confirmed:'Confirmed', s_pending:'Pending', s_cancelled:'Cancelled',
    s_no_show:'No-show', s_checked_in:'Checked in', s_in_house:'In house', s_checked_out:'Checked out',
    s_invoiced:'Invoiced', s_in_review:'In review', s_in_progress:'In progress', s_done:'Done',
    s_reported:'Reported', s_in_repair:'In repair', s_waiting:'Waiting',
    p_low:'Low', p_medium:'Medium', p_high:'High', p_urgent:'Urgent',
    seg_vip:'VIP', seg_returning:'Returning', seg_company:'Company', seg_occasional:'Occasional',
    cat_cleanliness:'Cleanliness', cat_service:'Service', cat_comfort:'Comfort', cat_location:'Location', cat_value:'Value',
  },
  nl: {
    sec_ops:'Operatie', sec_biz:'Zaken',
    nav_dashboard:'Dashboard', nav_rooms:'Kamerplattegrond', nav_reservations:'Reserveringen',
    nav_requests:'Verzoeken', nav_housekeeping:'Housekeeping', nav_maintenance:'Onderhoud',
    nav_crm:'Gasten-CRM', nav_more:'Meer modules',
    sub_dashboard:'Realtime operationeel overzicht', sub_rooms:'30 kamers · 3 verdiepingen · live status',
    sub_reservations:'Alle reserveringen en kanalen', sub_requests:'Serviceverzoeken van gasten',
    sub_housekeeping:'Schoonmaak op prioriteit', sub_maintenance:'Storingen en prioriteiten',
    sub_crm:'Profielen, voorkeuren en segmenten', sub_more:'Komt in de volgende fasen',
    email:'E-mail', password:'Wachtwoord', signin:'Inloggen', logout:'Uitloggen',
    kpi_occ:'Bezetting', kpi_adr:'ADR (gem. prijs)', kpi_revpar:'RevPAR', kpi_rev:'Omzet (periode)',
    op_status:'Operationele status', arrivals:'Aankomende aankomsten', satisfaction:'Tevredenheid',
    by_channel:'Reserveringen per kanaal', no_data:'Geen gegevens',
    available:'Beschikbaar', occupied:'Bezet', reserved:'Gereserveerd', cleaning:'Schoonmaak',
    maintenance:'Onderhoud', blocked:'Geblokkeerd',
    th_booking:'Boeking', th_guest:'Gast', th_channel:'Kanaal', th_room:'Kamer',
    th_checkin:'Check-in', th_checkout:'Check-out', th_pax:'Pers.', th_amount:'Bedrag', th_status:'Status',
    th_segment:'Segment', th_stays:'Verblijven', th_spent:'Totaal besteed', th_category:'Categorie',
    th_request:'Verzoek', th_dept:'Afdeling', th_assigned:'Toegewezen aan', th_priority:'Prioriteit',
    th_issue:'Probleem', th_location:'Locatie', th_source:'Bron', th_type:'Type', th_notes:'Notities',
    all_channels:'Alle kanalen', all_status:'Alle statussen', search_guest:'Zoek gast…',
    rooms:'kamers', floor:'Verdieping', preferences:'Voorkeuren', history:'Historie', profile:'Profiel',
    more_soon:'Facturatie, Reviews, Geautomatiseerde berichten en het Gastenportaal komen in Fase 3.',
    sec_admin:'Beheer', nav_settings:'Instellingen', sub_settings:'Hotelgegevens en gebruikersbeheer',
    set_hotel:'Hotelgegevens', set_name:'Naam', set_city:'Stad', set_country:'Land', set_currency:'Valuta',
    set_users:'Gebruikers & toegang', add_user:'Gebruiker toevoegen', save:'Opslaan', saved:'Opgeslagen ✓',
    th_name:'Naam', th_email:'E-mail', th_role:'Rol', th_active:'Actief', th_actions:'Acties',
    reset_pw:'Wachtwoord resetten', deactivate:'Deactiveren', activate:'Activeren', del:'Verwijderen',
    new_password:'Nieuw wachtwoord', confirm_del:'Deze gebruiker verwijderen?', admin_only:'Alleen beheerders.',
    role_admin:'Beheerder', role_manager:'Manager', role_reception:'Receptie',
    role_housekeeping:'Housekeeping', role_maintenance:'Onderhoud', role_finance:'Financieel',
    s_new:'Nieuw', s_confirmed:'Bevestigd', s_pending:'In afwachting', s_cancelled:'Geannuleerd',
    s_no_show:'No-show', s_checked_in:'Ingecheckt', s_in_house:'In huis', s_checked_out:'Uitgecheckt',
    s_invoiced:'Gefactureerd', s_in_review:'In beoordeling', s_in_progress:'In behandeling', s_done:'Klaar',
    s_reported:'Gemeld', s_in_repair:'In reparatie', s_waiting:'Wachtend',
    p_low:'Laag', p_medium:'Middel', p_high:'Hoog', p_urgent:'Urgent',
    seg_vip:'VIP', seg_returning:'Terugkerend', seg_company:'Bedrijf', seg_occasional:'Incidenteel',
    cat_cleanliness:'Netheid', cat_service:'Service', cat_comfort:'Comfort', cat_location:'Locatie', cat_value:'Prijs/kwaliteit',
  }
};

const state = {
  token: localStorage.getItem('stayos_token') || null,
  user: JSON.parse(localStorage.getItem('stayos_user') || 'null'),
  lang: localStorage.getItem('stayos_lang') || 'en',
  view: 'dashboard'
};
const t = (k) => (I18N[state.lang][k] ?? k);
const $ = (s) => document.querySelector(s);

async function api(path, opts = {}) {
  const res = await fetch('/api' + path, {
    ...opts,
    headers: { 'Content-Type':'application/json', 'Authorization':'Bearer '+state.token, ...(opts.headers||{}) }
  });
  if (res.status === 401) { doLogout(); throw new Error('unauthorized'); }
  return res.json();
}

// ---------- colour maps ----------
const ROOM_COLOR = { available:'var(--green)', occupied:'var(--red)', reserved:'var(--brand)',
  cleaning:'var(--amber)', maintenance:'var(--purple)', blocked:'var(--muted)' };
const tagClass = {
  // reservation
  new:'t-blue', confirmed:'t-green', pending:'t-amber', cancelled:'t-red', no_show:'t-red',
  checked_in:'t-blue', in_house:'t-green', checked_out:'t-gray', invoiced:'t-gray',
  // request/maintenance
  in_review:'t-amber', in_progress:'t-amber', done:'t-green', reported:'t-gray', in_repair:'t-amber', waiting:'t-gray',
  // priority
  low:'t-blue', medium:'t-amber', high:'t-red', urgent:'t-red',
  // segment
  vip:'t-purple', returning:'t-green', company:'t-blue', occasional:'t-gray',
};
const stTag = (s) => `<span class="tag ${tagClass[s]||'t-gray'}">${t('s_'+s)||s}</span>`;
const prTag = (p) => `<span class="tag ${tagClass[p]||'t-gray'}">${t('p_'+p)||p}</span>`;
const segTag = (s) => `<span class="tag ${tagClass[s]||'t-gray'}">${t('seg_'+s)||s}</span>`;
const CHAN = { booking:['B','c-booking','Booking.com'], expedia:['E','c-expedia','Expedia'],
  airbnb:['A','c-airbnb','Airbnb'], direct:['D','c-direct','Direct'] };

// ---------- nav ----------
const NAV = [
  ['sec_ops', [['dashboard','▦'],['rooms','▢'],['reservations','▤'],['requests','◷'],['housekeeping','✦'],['maintenance','⚒']]],
  ['sec_biz', [['crm','♛'],['more','◔']]],
  ['sec_admin', [['settings','⚙']], 'admin'],
];
function renderNav(){
  $('#nav').innerHTML = NAV.filter(([,,need]) => !need || state.user?.role===need).map(([sec,items]) =>
    `<div class="navsec">${t(sec)}</div>` + items.map(([v,ic]) =>
      `<a data-view="${v}" class="${state.view===v?'active':''}"><span class="ic">${ic}</span> ${t('nav_'+v)}</a>`
    ).join('')
  ).join('');
  $('#nav').querySelectorAll('a').forEach(a => a.onclick = () => go(a.dataset.view));
}

// ---------- views ----------
async function viewDashboard(){
  const d = await api('/dashboard');
  const sc = d.statusCounts || {};
  const order = ['occupied','available','reserved','cleaning','maintenance','blocked'];
  const statusRows = order.filter(k=>sc[k]).map(k =>
    `<div class="list-item"><span class="dot" style="background:${ROOM_COLOR[k]}"></span>
      <div style="flex:1"><b>${sc[k]} ${t(k)}</b></div></div>`).join('');
  const chTotal = d.channels.reduce((s,c)=>s+c.c,0)||1;
  const chRows = d.channels.map(c=>{
    const [ltr,cls,name]=CHAN[c.channel]||['?','c-direct',c.channel]; const pct=Math.round(c.c/chTotal*100);
    return `<div class="ratebar"><span class="chan ${cls}">${ltr}</span>
      <div class="bar"><i style="width:${pct}%;background:var(--brand)"></i></div><b>${pct}%</b>
      <span class="muted" style="width:84px">${name}</span></div>`;}).join('');
  const arr = d.arrivals.map(a=>`<div class="list-item">
      <div class="avatar">${a.guest.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
      <div style="flex:1"><b>${a.guest}</b><div class="muted">${t('th_room')} ${a.room||'—'} · ${a.check_in}</div></div>
      ${a.segment==='vip'?segTag('vip'):stTag(a.status)}</div>`).join('') || `<div class="muted">${t('no_data')}</div>`;
  const cats = d.satisfaction.categories||{};
  const catRows = Object.keys(cats).map(k=>`<div class="ratebar"><span class="muted" style="width:120px">${t('cat_'+k)||k}</span>
      <div class="bar"><i style="width:${cats[k]/5*100}%"></i></div><b>${cats[k]}</b></div>`).join('');
  $('#content').innerHTML = `
    <div class="grid kpis">
      <div class="card kpi"><div class="lbl">🛏 ${t('kpi_occ')}</div><div class="val">${d.occupancy}%</div></div>
      <div class="card kpi"><div class="lbl">€ ${t('kpi_adr')}</div><div class="val">€${d.adr}</div></div>
      <div class="card kpi"><div class="lbl">📈 ${t('kpi_revpar')}</div><div class="val">€${d.revpar}</div></div>
      <div class="card kpi"><div class="lbl">💶 ${t('kpi_rev')}</div><div class="val">€${d.revenueMonth.toLocaleString()}</div></div>
    </div>
    <div class="grid three" style="margin-top:16px">
      <div class="card"><div class="panelhead"><h3>${t('op_status')}</h3></div>${statusRows}</div>
      <div class="card"><div class="panelhead"><h3>${t('arrivals')}</h3></div>${arr}</div>
      <div class="card"><div class="panelhead"><h3>${t('satisfaction')}</h3></div>
        <div style="font-size:34px;font-weight:800">${d.satisfaction.avg||'—'}<span class="muted" style="font-size:14px">/5 · ${d.satisfaction.count}</span></div>
        ${catRows}</div>
    </div>
    <div class="card" style="margin-top:16px"><div class="panelhead"><h3>${t('by_channel')}</h3></div>${chRows}</div>`;
}

async function viewRooms(){
  const rooms = await api('/rooms');
  const legend = ['available','occupied','reserved','cleaning','maintenance','blocked'].map(k=>
    `<span><i class="dot" style="background:${ROOM_COLOR[k]}"></i> ${t(k)}</span>`).join('');
  let html = `<div class="legend">${legend}</div>`;
  for (let f=1; f<=3; f++){
    const fr = rooms.filter(r=>r.floor===f);
    html += `<div style="margin-bottom:20px"><div class="panelhead"><h3>${t('floor')} ${f}</h3><span class="muted">${fr.length} ${t('rooms')}</span></div><div class="roommap">` +
      fr.map(r=>`<div class="room ${r.status}">
        <div class="no">${r.number}</div><div class="ty">${state.lang==='nl'?r.name_nl:r.name_en}</div>
        <div class="st"><i class="dot" style="background:${ROOM_COLOR[r.status]}"></i>${t(r.status)}</div>
        <div class="who">${r.guest?('👤 '+r.guest):'&nbsp;'}</div></div>`).join('') + `</div></div>`;
  }
  $('#content').innerHTML = html;
}

async function viewReservations(){
  const rows = await api('/reservations');
  $('#content').innerHTML = `<div class="card" style="padding:0;overflow:hidden"><table>
    <thead><tr><th>${t('th_booking')}</th><th>${t('th_guest')}</th><th>${t('th_channel')}</th><th>${t('th_room')}</th>
    <th>${t('th_checkin')}</th><th>${t('th_checkout')}</th><th>${t('th_pax')}</th><th>${t('th_amount')}</th><th>${t('th_status')}</th></tr></thead>
    <tbody>${rows.map(r=>{const[ltr,cls,name]=CHAN[r.channel]||['?','c-direct',r.channel];return `<tr>
      <td><b>${r.code}</b></td><td>${r.guest}${r.segment==='vip'?' ♛':''}</td>
      <td><span class="chan ${cls}">${ltr}</span> <span class="muted">${name}</span></td>
      <td>${r.room||'—'}</td><td>${r.check_in}</td><td>${r.check_out}</td><td>${r.pax}</td>
      <td><b>€${r.amount}</b></td><td>${stTag(r.status)}</td></tr>`;}).join('')}</tbody></table></div>`;
}

async function viewRequests(){
  const rows = await api('/requests');
  $('#content').innerHTML = `<div class="card" style="padding:0;overflow:hidden"><table>
    <thead><tr><th>#</th><th>${t('th_request')}</th><th>${t('th_room')}</th><th>${t('th_category')}</th>
    <th>${t('th_assigned')}</th><th>${t('th_status')}</th></tr></thead>
    <tbody>${rows.map(r=>`<tr><td><b>#${r.id}</b></td><td>${r.description}</td><td>${r.room||'—'}</td>
      <td>${r.category}</td><td>${r.assigned_to||'—'}</td><td>${stTag(r.status)}</td></tr>`).join('')}</tbody></table></div>`;
}

async function viewHousekeeping(){
  const rows = await api('/housekeeping');
  $('#content').innerHTML = `<div class="card" style="padding:0;overflow:hidden"><table>
    <thead><tr><th>${t('th_room')}</th><th>${t('th_type')}</th><th>${t('th_priority')}</th>
    <th>${t('th_assigned')}</th><th>${t('th_status')}</th><th>${t('th_notes')}</th></tr></thead>
    <tbody>${rows.map(r=>`<tr><td><b>${r.room}</b></td><td>${r.type}</td><td>${prTag(r.priority)}</td>
      <td>${r.assigned_to||'—'}</td><td>${stTag(r.status)}</td><td class="muted">${r.notes||'—'}</td></tr>`).join('')}</tbody></table></div>`;
}

async function viewMaintenance(){
  const rows = await api('/maintenance');
  $('#content').innerHTML = `<div class="card" style="padding:0;overflow:hidden"><table>
    <thead><tr><th>#</th><th>${t('th_issue')}</th><th>${t('th_location')}</th><th>${t('th_source')}</th>
    <th>${t('th_priority')}</th><th>${t('th_status')}</th></tr></thead>
    <tbody>${rows.map(r=>`<tr><td><b>${r.code}</b></td><td>${r.description}</td><td>${r.location||('Room '+r.room)}</td>
      <td><span class="tag t-blue">${r.source}</span></td><td>${prTag(r.priority)}</td><td>${stTag(r.status)}</td></tr>`).join('')}</tbody></table></div>`;
}

async function viewCrm(){
  const rows = await api('/guests');
  const top = rows[0];
  let prefs=[]; try{prefs=JSON.parse(top.preferences||'[]');}catch{}
  $('#content').innerHTML = `<div class="grid two">
    <div class="card" style="padding:0;overflow:hidden"><table>
      <thead><tr><th>${t('th_guest')}</th><th>${t('th_segment')}</th><th>${t('th_stays')}</th><th>${t('th_spent')}</th></tr></thead>
      <tbody>${rows.map(g=>`<tr><td><b>${g.first_name} ${g.last_name}</b><div class="muted">${g.company||g.country||''}</div></td>
        <td>${segTag(g.segment)}</td><td>${g.stays_count}</td><td><b>€${(g.total_spent||0).toLocaleString()}</b></td></tr>`).join('')}</tbody></table></div>
    <div class="card"><div class="panelhead"><h3>${t('profile')} · ${top.first_name} ${top.last_name}</h3>${segTag(top.segment)}</div>
      <div class="list-item"><div style="flex:1"><b>${top.stays_count} ${t('th_stays')} · €${(top.total_spent||0).toLocaleString()}</b></div></div>
      <div style="margin:14px 0 8px"><b>${t('preferences')}</b></div>
      <div class="tags">${prefs.map(p=>`<span class="tag t-gray">${p}</span>`).join('')||'<span class="muted">—</span>'}</div>
      ${top.notes?`<div style="margin-top:14px" class="muted">${top.notes}</div>`:''}</div></div>`;
}

function viewMore(){
  $('#content').innerHTML = `<div class="note">${t('more_soon')}</div>
    <div class="grid three">${['Billing & Payments','Reviews','Automated messaging','Guest Portal','Channel manager','Reports & exports']
      .map(x=>`<div class="card"><b>${x}</b><div class="muted" style="margin-top:6px">${t('sub_more')}</div></div>`).join('')}</div>`;
}

const ROLES = ['admin','manager','reception','housekeeping','maintenance','finance'];

async function viewSettings(){
  if (state.user?.role !== 'admin'){ $('#content').innerHTML = `<div class="note">${t('admin_only')}</div>`; return; }
  const [h, users] = await Promise.all([api('/settings'), api('/users')]);
  const roleOpts = (sel) => ROLES.map(r=>`<option value="${r}" ${r===sel?'selected':''}>${t('role_'+r)}</option>`).join('');
  $('#content').innerHTML = `
    <div class="grid two">
      <div class="card">
        <div class="panelhead"><h3>${t('set_hotel')}</h3></div>
        <div class="field"><label>${t('set_name')}</label><input id="h_name" value="${h.name||''}"></div>
        <div class="field"><label>${t('set_city')}</label><input id="h_city" value="${h.city||''}"></div>
        <div class="field"><label>${t('set_country')}</label><input id="h_country" value="${h.country||''}"></div>
        <div class="field"><label>${t('set_currency')}</label><input id="h_currency" value="${h.currency||'EUR'}"></div>
        <button class="btn" id="saveHotel">${t('save')}</button> <span id="hotelMsg" class="muted"></span>
      </div>
      <div class="card">
        <div class="panelhead"><h3>${t('add_user')}</h3></div>
        <div class="field"><label>${t('th_name')}</label><input id="u_name"></div>
        <div class="field"><label>${t('th_email')}</label><input id="u_email" type="email"></div>
        <div class="field"><label>${t('new_password')}</label><input id="u_pw" type="text"></div>
        <div class="field"><label>${t('th_role')}</label><select id="u_role">${roleOpts('reception')}</select></div>
        <button class="btn" id="addUser">${t('add_user')}</button> <span id="userMsg" class="muted"></span>
      </div>
    </div>
    <div class="card" style="margin-top:16px;padding:0;overflow:hidden">
      <div class="panelhead" style="padding:16px 18px 0"><h3>${t('set_users')}</h3></div>
      <table style="margin-top:8px"><thead><tr>
        <th>${t('th_name')}</th><th>${t('th_email')}</th><th>${t('th_role')}</th><th>${t('th_active')}</th><th>${t('th_actions')}</th></tr></thead>
      <tbody>${users.map(u=>`<tr data-id="${u.id}">
        <td><b>${u.name}</b></td><td>${u.email}</td>
        <td><select class="u-role" style="background:var(--panel2);border:1px solid var(--line);color:var(--text);border-radius:7px;padding:5px">${roleOpts(u.role)}</select></td>
        <td>${u.active?'<span class="tag t-green">●</span>':'<span class="tag t-gray">○</span>'}</td>
        <td style="white-space:nowrap">
          <button class="btn ghost u-pw" style="padding:5px 9px">${t('reset_pw')}</button>
          <button class="btn ghost u-toggle" style="padding:5px 9px">${u.active?t('deactivate'):t('activate')}</button>
          <button class="btn ghost u-del" style="padding:5px 9px;color:var(--red)">${t('del')}</button>
        </td></tr>`).join('')}</tbody></table>
    </div>`;

  $('#saveHotel').onclick = async () => {
    await api('/settings/update',{method:'POST',body:JSON.stringify({
      name:$('#h_name').value, city:$('#h_city').value, country:$('#h_country').value, currency:$('#h_currency').value })});
    $('#hotelMsg').textContent = t('saved');
  };
  $('#addUser').onclick = async () => {
    const r = await api('/users/create',{method:'POST',body:JSON.stringify({
      name:$('#u_name').value, email:$('#u_email').value, password:$('#u_pw').value, role:$('#u_role').value })});
    if(r.ok) viewSettings(); else $('#userMsg').textContent = r.error||'error';
  };
  document.querySelectorAll('#content tbody tr').forEach(tr => {
    const id = tr.dataset.id;
    tr.querySelector('.u-role').onchange = (e) => api('/users/update',{method:'POST',body:JSON.stringify({id, role:e.target.value})});
    tr.querySelector('.u-toggle').onclick = async () => {
      const active = tr.querySelector('.u-toggle').textContent === t('activate');
      await api('/users/update',{method:'POST',body:JSON.stringify({id, active})}); viewSettings();
    };
    tr.querySelector('.u-pw').onclick = async () => {
      const pw = prompt(t('new_password')); if(pw){ await api('/users/update',{method:'POST',body:JSON.stringify({id, password:pw})}); }
    };
    tr.querySelector('.u-del').onclick = async () => {
      if(confirm(t('confirm_del'))){ const r = await api('/users/delete',{method:'POST',body:JSON.stringify({id})});
        if(r.ok) viewSettings(); else alert(r.error||'error'); }
    };
  });
}

const VIEWS = { dashboard:viewDashboard, rooms:viewRooms, reservations:viewReservations, settings:viewSettings,
  requests:viewRequests, housekeeping:viewHousekeeping, maintenance:viewMaintenance, crm:viewCrm, more:viewMore };

async function go(view){
  state.view = view;
  $('#pgTitle').textContent = t('nav_'+view);
  $('#pgSub').textContent = t('sub_'+view);
  renderNav();
  $('#content').innerHTML = `<div class="loading">…</div>`;
  try { await VIEWS[view](); } catch(e){ $('#content').innerHTML = `<div class="note">${e.message}</div>`; }
}

// ---------- shell / auth ----------
function applyStaticI18n(){
  document.querySelectorAll('[data-i]').forEach(el => el.textContent = t(el.dataset.i));
  document.querySelectorAll('#langsw button').forEach(b => b.classList.toggle('on', b.dataset.lang===state.lang));
  document.documentElement.lang = state.lang;
}
function showApp(){
  $('#loginView').classList.add('hidden');
  $('#appView').classList.remove('hidden');
  $('#avatar').textContent = (state.user?.name||'M').split(' ').map(x=>x[0]).slice(0,2).join('');
  applyStaticI18n(); renderNav(); go(state.view); loadHotelName();
}
async function loadHotelName(){
  try { const h = await api('/settings');
    if (h && h.name){ const el = document.querySelector('.sidebar .logo small'); if (el) el.textContent = h.name; } }
  catch {}
}
function showLogin(){
  $('#appView').classList.add('hidden');
  $('#loginView').classList.remove('hidden');
  applyStaticI18n();
}
function doLogout(){
  state.token=null; state.user=null;
  localStorage.removeItem('stayos_token'); localStorage.removeItem('stayos_user');
  showLogin();
}

$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('#loginErr').textContent='';
  const r = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email:$('#email').value, password:$('#password').value }) }).then(r=>r.json());
  if (r.token){
    state.token=r.token; state.user=r.user;
    localStorage.setItem('stayos_token', r.token);
    localStorage.setItem('stayos_user', JSON.stringify(r.user));
    showApp();
  } else { $('#loginErr').textContent = r.error || 'Login failed'; }
});
$('#logoutBtn').addEventListener('click', doLogout);
$('#langsw').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if(!b) return;
  state.lang = b.dataset.lang; localStorage.setItem('stayos_lang', state.lang);
  applyStaticI18n();
  if (!$('#appView').classList.contains('hidden')) go(state.view); else showLogin();
});

// boot
if (state.token) showApp(); else showLogin();
