// StayOS — database layer (zero dependency, node:sqlite)
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
// DB_FILE lets the server store the database outside the uploaded folder
// (so an accidentally-committed database is ignored and a fresh one is seeded).
export const DB_PATH = process.env.DB_FILE || join(DATA_DIR, 'stayos.sqlite');
mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);
try { db.exec('PRAGMA journal_mode = MEMORY;'); } catch { /* default journal */ }
db.exec('PRAGMA foreign_keys = ON;');

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, city TEXT, country TEXT,
    rooms_count INTEGER, currency TEXT DEFAULT 'EUR',
    timezone TEXT DEFAULT 'Europe/Amsterdam')`,
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'reception',
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS room_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name_en TEXT NOT NULL, name_nl TEXT NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 2,
    base_price REAL NOT NULL DEFAULT 100)`,
  `CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number INTEGER NOT NULL UNIQUE, floor INTEGER NOT NULL,
    room_type_id INTEGER NOT NULL REFERENCES room_types(id),
    status TEXT NOT NULL DEFAULT 'available', notes TEXT)`,
  `CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL, last_name TEXT NOT NULL,
    email TEXT, phone TEXT, country TEXT,
    segment TEXT DEFAULT 'occasional',
    company TEXT, preferences TEXT, notes TEXT,
    total_spent REAL DEFAULT 0, stays_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    guest_id INTEGER NOT NULL REFERENCES guests(id),
    room_id INTEGER REFERENCES rooms(id),
    channel TEXT NOT NULL DEFAULT 'direct',
    status TEXT NOT NULL DEFAULT 'new',
    check_in TEXT NOT NULL, check_out TEXT NOT NULL,
    pax INTEGER NOT NULL DEFAULT 1,
    amount REAL NOT NULL DEFAULT 0, currency TEXT DEFAULT 'EUR',
    special_requests TEXT, payment_method TEXT,
    created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS service_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_id INTEGER REFERENCES reservations(id),
    room_id INTEGER REFERENCES rooms(id),
    category TEXT NOT NULL, description TEXT NOT NULL,
    department TEXT, assigned_to TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS housekeeping_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER NOT NULL REFERENCES rooms(id),
    type TEXT NOT NULL, priority TEXT NOT NULL DEFAULT 'medium',
    assigned_to TEXT, status TEXT NOT NULL DEFAULT 'waiting',
    notes TEXT, created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS maintenance_issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    room_id INTEGER REFERENCES rooms(id), location TEXT,
    description TEXT NOT NULL, source TEXT,
    priority TEXT NOT NULL DEFAULT 'medium',
    status TEXT NOT NULL DEFAULT 'reported',
    created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL DEFAULT 'invoice',
    reservation_id INTEGER REFERENCES reservations(id),
    guest_id INTEGER REFERENCES guests(id),
    method TEXT, amount REAL NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'unpaid',
    issued_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_id INTEGER REFERENCES reservations(id),
    guest_id INTEGER REFERENCES guests(id),
    rating REAL NOT NULL, categories TEXT, comment TEXT,
    forwarded INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    action TEXT NOT NULL, entity TEXT, entity_id INTEGER,
    at TEXT DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS message_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE, name_en TEXT, name_nl TEXT,
    channel TEXT, subject TEXT, body TEXT, active INTEGER DEFAULT 1)`,
];

export function initSchema() { for (const s of SCHEMA) db.exec(s); }
export const all = (sql, ...p) => db.prepare(sql).all(...p);
export const get = (sql, ...p) => db.prepare(sql).get(...p);
export const run = (sql, ...p) => db.prepare(sql).run(...p);
