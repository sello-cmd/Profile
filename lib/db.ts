import fs from "fs";
import path from "path";
import os from "os";

export interface DbInquiry {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  handle?: string;
  projectTypes: string[];
  budget: string;
  timeline: string;
  scope: string;
  createdAt: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Booked" | "Archived";
}

export interface DbBooking {
  id: string;
  name: string;
  email: string;
  type: string;
  date: string;
  time: string;
  platform: string;
  notes?: string;
  createdAt: string;
  status: "Confirmed" | "Completed" | "Rescheduled" | "Cancelled";
}

export interface DbChatMessage {
  id: string;
  sender: "user" | "sean";
  text: string;
  timestamp: string;
  email?: string;
  phone?: string;
}

// Determine writable DB directory: On Vercel / serverless use os.tmpdir(), locally use process.cwd()/data/db
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_DIR = isServerless 
  ? path.join(os.tmpdir(), "sean_portfolio_db")
  : path.join(process.cwd(), "data", "db");

const INQUIRIES_FILE = path.join(DB_DIR, "inquiries.json");
const BOOKINGS_FILE = path.join(DB_DIR, "bookings.json");

// In-Memory Fallback & Cache (guarantees zero-downtime on read-only environments)
const initialInquiriesData: DbInquiry[] = [
  {
    id: "inq-01",
    fullName: "Marcus Vance",
    email: "m.vance@solaris-labs.com",
    company: "Solaris Labs",
    handle: "@m_vance",
    projectTypes: ["Full-Stack Web App", "SaaS MVP"],
    budget: "$5k - $10k",
    timeline: "Immediate (within 2 weeks)",
    scope: "We need a Next.js 15 enterprise SaaS dashboard with sub-second real-time telemetry and Stripe recurring subscriptions.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "New"
  },
  {
    id: "inq-02",
    fullName: "Evelyn Reed",
    email: "evelyn@aegis-esports.gg",
    company: "Aegis Esports League",
    handle: "@evelyn_gg",
    projectTypes: ["Esports Tournament Broadcast", "Visual Design"],
    budget: "$3k - $5k",
    timeline: "1 - 2 months",
    scope: "Looking for ChampZero to direct our 16-team regional LAN broadcast, custom vMix HTML scoreboards, and stage logistics.",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    status: "Proposal Sent"
  },
  {
    id: "inq-03",
    fullName: "Engr. Rafael Santos",
    email: "r.santos@hydro-iot.ph",
    company: "HydroGuard Batangas",
    handle: "+63 917 882 1092",
    projectTypes: ["IoT & SCADA Telemetry"],
    budget: "$3k - $5k",
    timeline: "1 - 2 months",
    scope: "ESP32 firmware integration with water level sensors and Firebase realtime DB alert triggers.",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    status: "Booked"
  }
];

const initialBookingsData: DbBooking[] = [
  {
    id: "bk-01",
    name: "Marcus Vance",
    email: "m.vance@solaris-labs.com",
    type: "15-Min Intro & Discovery Call",
    date: "2026-09-01",
    time: "10:00 AM (UTC+8)",
    platform: "Google Meet",
    notes: "Scoping SaaS MVP architecture and deployment roadmap.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "Confirmed"
  },
  {
    id: "bk-02",
    name: "Evelyn Reed",
    email: "evelyn@aegis-esports.gg",
    type: "30-Min Project Scoping",
    date: "2026-09-02",
    time: "03:00 PM (UTC+8)",
    platform: "WhatsApp",
    notes: "Tournament live production gear requirements and stream overlays.",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    status: "Confirmed"
  }
];

let inMemoryInquiries: DbInquiry[] = [...initialInquiriesData];
let inMemoryBookings: DbBooking[] = [...initialBookingsData];

function safeWrite(filePath: string, content: string) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf-8");
  } catch (err) {
    // Graceful fallback on serverless environments without crashing
    console.warn(`[Storage Warning] File write failed for ${filePath}, falling back to memory store:`, err);
  }
}

function safeRead<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`[Storage Warning] File read failed for ${filePath}:`, err);
  }
  return fallback;
}

// INQUIRY OPERATIONS
export function getInquiries(): DbInquiry[] {
  const fromFile = safeRead<DbInquiry[] | null>(INQUIRIES_FILE, null);
  if (fromFile && fromFile.length > 0) {
    inMemoryInquiries = fromFile;
    return fromFile;
  }
  return inMemoryInquiries;
}

export function createInquiry(data: Omit<DbInquiry, "id" | "createdAt" | "status">): DbInquiry {
  const newInquiry: DbInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  inMemoryInquiries.unshift(newInquiry);
  safeWrite(INQUIRIES_FILE, JSON.stringify(inMemoryInquiries, null, 2));
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: DbInquiry["status"]): DbInquiry | null {
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;

  inquiries[index].status = status;
  inMemoryInquiries = inquiries;
  safeWrite(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  return inquiries[index];
}

export function deleteInquiry(id: string): boolean {
  const inquiries = getInquiries();
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length === inquiries.length) return false;

  inMemoryInquiries = filtered;
  safeWrite(INQUIRIES_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

// BOOKING OPERATIONS
export function getBookings(): DbBooking[] {
  const fromFile = safeRead<DbBooking[] | null>(BOOKINGS_FILE, null);
  if (fromFile && fromFile.length > 0) {
    inMemoryBookings = fromFile;
    return fromFile;
  }
  return inMemoryBookings;
}

export function getBookedSlots(date?: string): { date: string; time: string }[] {
  const bookings = getBookings();
  const activeBookings = bookings.filter((b) => b.status !== "Cancelled");
  if (date) {
    return activeBookings
      .filter((b) => b.date === date)
      .map((b) => ({ date: b.date, time: b.time }));
  }
  return activeBookings.map((b) => ({ date: b.date, time: b.time }));
}

export function isSlotBooked(date: string, time: string): boolean {
  const bookings = getBookings();
  return bookings.some(
    (b) => b.date === date && b.time === time && b.status !== "Cancelled"
  );
}

export function createBooking(data: Omit<DbBooking, "id" | "createdAt" | "status">): DbBooking | null {
  // Prevent double booking conflict
  if (isSlotBooked(data.date, data.time)) {
    return null;
  }

  const newBooking: DbBooking = {
    ...data,
    id: `bk-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  };

  inMemoryBookings.unshift(newBooking);
  safeWrite(BOOKINGS_FILE, JSON.stringify(inMemoryBookings, null, 2));
  return newBooking;
}

export function updateBookingStatus(id: string, status: DbBooking["status"]): DbBooking | null {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;

  bookings[index].status = status;
  inMemoryBookings = bookings;
  safeWrite(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  return bookings[index];
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  if (filtered.length === bookings.length) return false;

  inMemoryBookings = filtered;
  safeWrite(BOOKINGS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
