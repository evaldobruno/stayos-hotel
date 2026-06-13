// StayOS — seed the Hotel Miramar demo dataset
import { db, initSchema, run, get } from './db.js';
import { hashPassword } from './auth.js';

initSchema();

const TABLES = ['reviews','invoices','maintenance_issues','housekeeping_tasks',
  'service_requests','reservations','guests','rooms','room_types','users','audit_log','hotels'];
db.exec('PRAGMA foreign_keys = OFF;');
for (const t of TABLES) db.exec(`DELETE FROM ${t};`);
for (const t of TABLES) run(`DELETE FROM sqlite_sequence WHERE name=?`, t);
db.exec('PRAGMA foreign_keys = ON;');

run(`INSERT INTO hotels(name,city,country,rooms_count,currency,timezone)
     VALUES(?,?,?,?,?,?)`, 'Hotel Miramar', 'Domburg', 'NL', 30, 'EUR', 'Europe/Amsterdam');

const users = [
  ['Manager Miramar', 'admin@miramar.hotel', 'admin123', 'admin'],
  ['Reception Desk',  'reception@miramar.hotel', 'reception123', 'reception'],
  ['Housekeeping Lead','housekeeping@miramar.hotel', 'house123', 'housekeeping'],
];
for (const [name, email, pw, role] of users)
  run(`INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)`,
      name, email, hashPassword(pw), role);

const types = [
  ['STD', 'Standard', 'Standaard', 2, 95],
  ['SUP', 'Superior', 'Superior', 2, 120],
  ['DBL', 'Double', 'Tweepersoons', 2, 110],
  ['JRS', 'Junior Suite', 'Junior Suite', 3, 165],
];
const typeId = {};
for (const [code, en, nl, cap, price] of types) {
  run(`INSERT INTO room_types(code,name_en,name_nl,capacity,base_price) VALUES(?,?,?,?,?)`,
      code, en, nl, cap, price);
  typeId[code] = get(`SELECT id FROM room_types WHERE code=?`, code).id;
}
const typeByIndex = ['STD','STD','SUP','DBL','JRS'];

// 30 rooms: floors 1-3, rooms x01..x10
const dist = ['occupied','occupied','occupied','occupied','occupied','available','available','reserved','cleaning','occupied'];
for (let f = 1; f <= 3; f++) {
  for (let n = 1; n <= 10; n++) {
    const no = f * 100 + n;
    const seed = (no * 7 + f) % 10;
    let status = dist[seed];
    if (no === 305 || no === 210) status = 'maintenance';
    if (no === 308) status = 'blocked';
    const tcode = typeByIndex[no % typeByIndex.length];
    run(`INSERT INTO rooms(number,floor,room_type_id,status) VALUES(?,?,?,?)`,
        no, f, typeId[tcode], status);
  }
}
const roomId = (no) => get(`SELECT id FROM rooms WHERE number=?`, no).id;

const guests = [
  ['Lukas','Schmidt','l.schmidt@example.de','+49 170 5551234','Germany','vip',null,
    JSON.stringify(['High floor','King bed','Extra pillow','Late check-out','Gluten-free']),'Repeat VIP guest. Prefers quiet rooms.',4260,7],
  ['Ana','Ferreira','ana.ferreira@example.pt','+351 912 345 678','Portugal','returning',null,
    JSON.stringify(['Quiet room','Sea view']),'',1180,4],
  ['John','Marks','john.marks@example.com','+44 7700 900123','United Kingdom','occasional',null,'[]','',340,1],
  ['Carla','Nunes','carla.nunes@example.pt','+351 933 111 222','Portugal','occasional',null,'[]','',0,0],
  ['Maria','Rocha','m.rocha@example.pt','+351 961 222 333','Portugal','returning',null,
    JSON.stringify(['Early breakfast']),'',410,2],
  ['Tomas','Almeida','t.almeida@techsolutions.example','+351 911 444 555','Portugal','company','Tech Solutions Ltd',
    '[]','Corporate account — invoices to company.',9820,14],
  ['Sofia','Costa','sofia.costa@example.pt','+351 962 333 444','Portugal','occasional',null,'[]','Family of 4.',912,1],
  ['Rui','Oliveira','rui.oliveira@example.pt','+351 913 555 666','Portugal','occasional',null,'[]','',286,1],
  ['Pedro','Santos','p.santos@example.pt','+351 914 777 888','Portugal','occasional',null,'[]','Reported A/C issue.',160,1],
];
const guestId = {};
for (const g of guests) {
  run(`INSERT INTO guests(first_name,last_name,email,phone,country,segment,company,preferences,notes,total_spent,stays_count)
       VALUES(?,?,?,?,?,?,?,?,?,?,?)`, ...g);
  guestId[`${g[0]} ${g[1]}`] = get(`SELECT id FROM guests WHERE email IS ?`, g[2]).id;
}

const resv = [
  ['BK-90412','Ana Ferreira',204,'booking','checked_in','2026-06-12','2026-06-15',2,372,'Late arrival ~15:00'],
  ['BK-90410','Lukas Schmidt',105,'booking','confirmed','2026-06-12','2026-06-14',2,348,'VIP — high floor, king bed'],
  ['DR-2231','John Marks',310,'direct','pending','2026-06-12','2026-06-13',1,124,null],
  ['EX-5567','Carla Nunes',308,'expedia','new','2026-06-12','2026-06-16',3,620,'Cot for child'],
  ['AB-1188','Maria Rocha',108,'airbnb','in_house','2026-06-11','2026-06-14',2,410,'Airport transfer on departure'],
  ['BK-90388','Tomas Almeida',207,'booking','checked_out','2026-06-09','2026-06-12',2,540,'Company invoice'],
  ['DR-2228','Sofia Costa',301,'direct','in_house','2026-06-09','2026-06-12',4,912,'Family room, 2 extra towels'],
  ['BK-90377','Rui Oliveira',110,'booking','invoiced','2026-06-10','2026-06-12',1,286,null],
];
for (const [code,gk,room,channel,status,ci,co,pax,amount,req] of resv) {
  run(`INSERT INTO reservations(code,guest_id,room_id,channel,status,check_in,check_out,pax,amount,special_requests)
       VALUES(?,?,?,?,?,?,?,?,?,?)`, code, guestId[gk], roomId(room), channel, status, ci, co, pax, amount, req);
}

// keep room status coherent with active reservations
db.exec(`UPDATE rooms SET status='occupied'
         WHERE id IN (SELECT room_id FROM reservations WHERE status IN ('checked_in','in_house'))`);
db.exec(`UPDATE rooms SET status='reserved'
         WHERE id IN (SELECT room_id FROM reservations WHERE status IN ('confirmed','new','pending'))
         AND status NOT IN ('maintenance','blocked')`);

const reqs = [
  [204,'housekeeping','Extra towels + amenities','Housekeeping','Maria L.','in_progress'],
  [105,'restaurant','Dinner for 2 — restaurant 8 PM','Restaurant','Reception','new'],
  [305,'maintenance','Air conditioning not cooling','Maintenance','Tech Pedro','in_progress'],
  [108,'transport','Airport transfer tomorrow 6 AM','Transport','Reception','done'],
  [207,'reception','Late check-out until 2 PM','Reception','Auto','done'],
  [105,'spa','Relaxing massage 5 PM','Spa','Spa Ines','new'],
  [301,'laundry','Laundry pickup','Laundry',null,'new'],
];
for (const [room,cat,desc,dept,assignee,status] of reqs)
  run(`INSERT INTO service_requests(room_id,category,description,department,assigned_to,status)
       VALUES(?,?,?,?,?,?)`, roomId(room), cat, desc, dept, assignee, status);

const hk = [
  [204,'arrival','high','Maria L.','cleaning','VIP guest arriving'],
  [110,'departure','high','Sofia P.','waiting',null],
  [301,'departure','medium',null,'waiting','Report bathroom tap'],
  [108,'daily','low','Maria L.','done','Extra towels requested'],
  [207,'extra','medium','Sofia P.','cleaning',null],
];
for (const [room,type,prio,assignee,status,notes] of hk)
  run(`INSERT INTO housekeeping_tasks(room_id,type,priority,assigned_to,status,notes)
       VALUES(?,?,?,?,?,?)`, roomId(room), type, prio, assignee, status, notes);

const mt = [
  ['M-218',305,'Room 305','Air conditioning not cooling','guest','urgent','in_repair'],
  ['M-217',301,'Room 301','Bathroom tap dripping','housekeeping','medium','reported'],
  ['M-216',null,'Floor 2','Hallway light bulb out','staff','low','reported'],
  ['M-214',210,'Room 210','Electronic lock faulty','reception','urgent','in_repair'],
  ['M-211',109,'Room 109','TV no signal','guest','medium','done'],
];
for (const [code,room,loc,desc,src,prio,status] of mt)
  run(`INSERT INTO maintenance_issues(code,room_id,location,description,source,priority,status)
       VALUES(?,?,?,?,?,?,?)`, code, room?roomId(room):null, loc, desc, src, prio, status);

const inv = [
  ['INV 2026/1182','invoice','BK-90377','Rui Oliveira','Card',286,'paid'],
  ['INV 2026/1181','invoice','BK-90388','Tomas Almeida','Transfer',540,'unpaid'],
  ['RC 2026/0904','receipt','DR-2228','Sofia Costa','Mobile pay',912,'paid'],
  ['CN 2026/0033','credit_note',null,'Pedro Santos','Refund',-160,'issued'],
];
for (const [num,type,rcode,gk,method,amount,status] of inv) {
  const r = rcode ? get(`SELECT id FROM reservations WHERE code=?`, rcode) : null;
  run(`INSERT INTO invoices(number,type,reservation_id,guest_id,method,amount,status)
       VALUES(?,?,?,?,?,?,?)`, num, type, r?r.id:null, guestId[gk], method, amount, status);
}

const rv = [
  ['BK-90377','Rui Oliveira',5.0,{cleanliness:5,service:5,comfort:5,location:5,value:4},
    'Impeccable service and a very clean room. I will definitely be back.',1],
  ['BK-90388','Tomas Almeida',4.0,{cleanliness:4,service:5,comfort:4,location:5,value:4},
    'Great location, only the breakfast could have more variety.',0],
];
for (const [rcode,gk,rating,cats,comment,fwd] of rv) {
  const r = get(`SELECT id FROM reservations WHERE code=?`, rcode);
  run(`INSERT INTO reviews(reservation_id,guest_id,rating,categories,comment,forwarded)
       VALUES(?,?,?,?,?,?)`, r.id, guestId[gk], rating, JSON.stringify(cats), comment, fwd);
}

const counts = {};
for (const t of ['rooms','guests','reservations','users','service_requests','maintenance_issues','reviews'])
  counts[t] = get(`SELECT COUNT(*) c FROM ${t}`).c;
console.log('Seed complete:', counts);
console.log('Login: admin@miramar.hotel / admin123');
