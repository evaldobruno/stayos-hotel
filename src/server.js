// StayOS — HTTP server (zero dependency): static frontend + REST API
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize } from 'node:path';
import { initSchema, all, get, run } from './db.js';
import { verifyPassword, signToken, verifyToken } from './auth.js';

initSchema();
// Auto-seed on first boot (hosting platforms use ephemeral disks and don't run manual commands)
if (get(`SELECT COUNT(*) c FROM rooms`).c === 0) {
  console.log('Empty database — seeding demo data…');
  await import('./seed.js');
}
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const PORT = process.env.PORT || 4000;

const MIME = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript',
  '.json':'application/json', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.png':'image/png' };

const json = (res, code, data) => {
  res.writeHead(code, { 'Content-Type':'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
};
const body = (req) => new Promise(r => { let d=''; req.on('data',c=>d+=c); req.on('end',()=>{ try{r(JSON.parse(d||'{}'))}catch{r({})} }); });
const auth = (req) => verifyToken((req.headers.authorization||'').replace(/^Bearer /,''));

function nights(ci, co){ return Math.max(1, Math.round((Date.parse(co)-Date.parse(ci))/86400000)); }

// ---------- API ----------
const api = {
  'POST /api/login': async (req,res) => {
    const { email, password } = await body(req);
    const u = get(`SELECT * FROM users WHERE email=? AND active=1`, (email||'').toLowerCase().trim());
    if (!u || !verifyPassword(password||'', u.password_hash)) return json(res,401,{error:'Invalid credentials'});
    const token = signToken({ uid:u.id, role:u.role, name:u.name });
    json(res,200,{ token, user:{ id:u.id, name:u.name, email:u.email, role:u.role } });
  },

  'GET /api/me': (req,res,ctx) => json(res,200,{ user: ctx }),

  'GET /api/dashboard': (req,res) => {
    const total = get(`SELECT COUNT(*) c FROM rooms`).c;
    const sc = {};
    for (const r of all(`SELECT status, COUNT(*) c FROM rooms GROUP BY status`)) sc[r.status]=r.c;
    const occ = sc.occupied || 0;
    const occupancy = Math.round((occ/total)*100);
    const agg = get(`SELECT SUM(amount) rev, SUM(julianday(check_out)-julianday(check_in)) nts,
                     COUNT(*) n FROM reservations WHERE status NOT IN ('cancelled','no_show')`);
    const adr = agg.nts ? Math.round(agg.rev/agg.nts) : 0;
    const revpar = Math.round(adr * occupancy/100);
    const channels = all(`SELECT channel, COUNT(*) c FROM reservations GROUP BY channel`);
    const arrivals = all(`SELECT r.code, r.status, r.check_in, rm.number room,
                          g.first_name||' '||g.last_name guest, g.segment
                          FROM reservations r JOIN guests g ON g.id=r.guest_id
                          LEFT JOIN rooms rm ON rm.id=r.room_id
                          WHERE r.status IN ('confirmed','new','pending','checked_in')
                          ORDER BY r.check_in LIMIT 6`);
    const rv = all(`SELECT rating, categories FROM reviews`);
    const catSum={}, catN={}; let rsum=0;
    for (const r of rv){ rsum+=r.rating; const c=JSON.parse(r.categories||'{}');
      for (const k in c){ catSum[k]=(catSum[k]||0)+c[k]; catN[k]=(catN[k]||0)+1; } }
    const cats={}; for (const k in catSum) cats[k]=+(catSum[k]/catN[k]).toFixed(1);
    json(res,200,{ occupancy, adr, revpar, revenueMonth: Math.round(agg.rev||0),
      statusCounts: sc, totalRooms: total, channels, arrivals,
      satisfaction:{ avg: rv.length? +(rsum/rv.length).toFixed(1):0, count: rv.length, categories: cats } });
  },

  'GET /api/rooms': (req,res) => json(res,200, all(
    `SELECT rm.id, rm.number, rm.floor, rm.status, t.code type_code, t.name_en, t.name_nl,
            (SELECT g.first_name||' '||g.last_name FROM reservations r JOIN guests g ON g.id=r.guest_id
             WHERE r.room_id=rm.id AND r.status IN ('checked_in','in_house') LIMIT 1) guest
     FROM rooms rm JOIN room_types t ON t.id=rm.room_type_id ORDER BY rm.number`)),

  'GET /api/reservations': (req,res) => json(res,200, all(
    `SELECT r.id, r.code, r.channel, r.status, r.check_in, r.check_out, r.pax, r.amount,
            r.special_requests, rm.number room,
            g.first_name||' '||g.last_name guest, g.segment
     FROM reservations r JOIN guests g ON g.id=r.guest_id
     LEFT JOIN rooms rm ON rm.id=r.room_id ORDER BY r.check_in DESC`)),

  'GET /api/guests': (req,res) => json(res,200, all(
    `SELECT id, first_name, last_name, country, segment, company, total_spent, stays_count, preferences, notes
     FROM guests ORDER BY total_spent DESC`)),

  'GET /api/requests': (req,res) => json(res,200, all(
    `SELECT sr.id, sr.category, sr.description, sr.department, sr.assigned_to, sr.status, rm.number room
     FROM service_requests sr LEFT JOIN rooms rm ON rm.id=sr.room_id ORDER BY sr.id DESC`)),

  'GET /api/maintenance': (req,res) => json(res,200, all(
    `SELECT mi.code, mi.location, mi.description, mi.source, mi.priority, mi.status, rm.number room
     FROM maintenance_issues mi LEFT JOIN rooms rm ON rm.id=mi.room_id ORDER BY mi.id DESC`)),

  'GET /api/housekeeping': (req,res) => json(res,200, all(
    `SELECT hk.type, hk.priority, hk.assigned_to, hk.status, hk.notes, rm.number room
     FROM housekeeping_tasks hk JOIN rooms rm ON rm.id=hk.room_id ORDER BY hk.priority DESC`)),
};

// mutations (example: update room status / reservation status) — protected
api['POST /api/rooms/status'] = async (req,res) => {
  const { id, status } = await body(req);
  run(`UPDATE rooms SET status=? WHERE id=?`, status, id);
  json(res,200,{ ok:true });
};
api['POST /api/reservations/status'] = async (req,res) => {
  const { id, status } = await body(req);
  run(`UPDATE reservations SET status=? WHERE id=?`, status, id);
  json(res,200,{ ok:true });
};

const OPEN = new Set(['POST /api/login']);

async function serveStatic(req,res){
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p==='/' ) p='/index.html';
  const file = normalize(join(PUBLIC, p));
  if (!file.startsWith(PUBLIC)) return json(res,403,{error:'forbidden'});
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)]||'application/octet-stream' });
    res.end(data);
  } catch { // SPA fallback
    try { const idx = await readFile(join(PUBLIC,'index.html'));
      res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); res.end(idx); }
    catch { json(res,404,{error:'not found'}); }
  }
}

const server = createServer(async (req,res) => {
  const path = req.url.split('?')[0];
  const key = `${req.method} ${path}`;
  if (path.startsWith('/api/')) {
    const handler = api[key];
    if (!handler) return json(res,404,{error:'unknown endpoint'});
    let ctx = null;
    if (!OPEN.has(key)) { ctx = auth(req); if (!ctx) return json(res,401,{error:'unauthorized'}); }
    try { await handler(req,res,ctx); }
    catch(e){ console.error(e); json(res,500,{error:'server error'}); }
    return;
  }
  serveStatic(req,res);
});
server.listen(PORT, () => console.log(`StayOS running → http://localhost:${PORT}`));
