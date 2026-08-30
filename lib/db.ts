import fs from "fs";
import path from "path";
import os from "os";
import { firestoreDb, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

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

// In-Memory Master Store
let inMemoryInquiries: DbInquiry[] = [];
let inMemoryBookings: DbBooking[] = [];

function getDbPaths() {
  const isProduction = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL) || process.platform !== "win32";
  const dbDir = isProduction
    ? path.join(os.tmpdir(), "slec_db")
    : path.join(process.cwd(), "data", "db");

  return {
    dir: dbDir,
    inquiries: path.join(dbDir, "inquiries.json"),
    bookings: path.join(dbDir, "bookings.json"),
  };
}

function safeWrite(filePath: string, content: string) {
  try {
    const { dir } = getDbPaths();
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf-8");
  } catch (err) {
    console.warn(`[Safe Storage] File write fallback:`, err);
  }
}

function safeRead<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`[Safe Storage] File read fallback:`, err);
  }
  return fallback;
}

// ==========================================
// INQUIRY OPERATIONS
// ==========================================
export async function getInquiriesAsync(): Promise<DbInquiry[]> {
  if (firestoreDb && isFirebaseConfigured) {
    try {
      const colRef = collection(firestoreDb, "inquiries");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items: DbInquiry[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as DbInquiry);
      });
      if (items.length > 0) {
        inMemoryInquiries = items;
        return items;
      }
    } catch (err: any) {
      console.warn("[Firebase] Could not fetch inquiries from Firestore:", err?.message);
    }
  }
  return getInquiries();
}

export function getInquiries(): DbInquiry[] {
  try {
    const { inquiries } = getDbPaths();
    const fromFile = safeRead<DbInquiry[] | null>(inquiries, null);
    if (fromFile && Array.isArray(fromFile) && fromFile.length > 0) {
      inMemoryInquiries = fromFile;
      return fromFile;
    }
  } catch (e) {
    console.warn("[DB] Inquiries read exception:", e);
  }
  return inMemoryInquiries;
}

export async function createInquiryAsync(data: Omit<DbInquiry, "id" | "createdAt" | "status">): Promise<DbInquiry> {
  const newInquiry: DbInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  inMemoryInquiries.unshift(newInquiry);
  try {
    const { inquiries } = getDbPaths();
    safeWrite(inquiries, JSON.stringify(inMemoryInquiries, null, 2));
  } catch (e) {
    console.warn("[DB] Inquiry write exception:", e);
  }

  // Firebase Firestore Direct Sync
  if (firestoreDb && isFirebaseConfigured) {
    try {
      await setDoc(doc(firestoreDb, "inquiries", newInquiry.id), newInquiry);
      console.log(`[Firebase] Inquiry ${newInquiry.id} successfully saved to Firestore!`);
    } catch (err: any) {
      console.warn("[Firebase] Error saving inquiry to Firestore (Check security rules):", err?.message);
    }
  }

  return newInquiry;
}

export function createInquiry(data: Omit<DbInquiry, "id" | "createdAt" | "status">): DbInquiry {
  const newInquiry: DbInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  try {
    inMemoryInquiries.unshift(newInquiry);
    const { inquiries } = getDbPaths();
    safeWrite(inquiries, JSON.stringify(inMemoryInquiries, null, 2));

    if (firestoreDb && isFirebaseConfigured) {
      setDoc(doc(firestoreDb, "inquiries", newInquiry.id), newInquiry).catch((err) =>
        console.warn("[Firebase] Background Firestore write error:", err?.message)
      );
    }
  } catch (e) {
    console.warn("[DB] Inquiry write exception:", e);
  }
  return newInquiry;
}

export async function updateInquiryStatusAsync(id: string, status: DbInquiry["status"]): Promise<DbInquiry | null> {
  const updated = updateInquiryStatus(id, status);
  if (firestoreDb && isFirebaseConfigured && updated) {
    try {
      await updateDoc(doc(firestoreDb, "inquiries", id), { status });
    } catch (e: any) {
      console.warn("[Firebase] Error updating inquiry in Firestore:", e?.message);
    }
  }
  return updated;
}

export function updateInquiryStatus(id: string, status: DbInquiry["status"]): DbInquiry | null {
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;

  inquiries[index].status = status;
  inMemoryInquiries = inquiries;
  try {
    const { inquiries: inqPath } = getDbPaths();
    safeWrite(inqPath, JSON.stringify(inquiries, null, 2));
  } catch (e) {
    console.warn("[DB] Inquiry update exception:", e);
  }
  return inquiries[index];
}

export async function deleteInquiryAsync(id: string): Promise<boolean> {
  const deleted = deleteInquiry(id);
  if (firestoreDb && isFirebaseConfigured) {
    try {
      await deleteDoc(doc(firestoreDb, "inquiries", id));
    } catch (e: any) {
      console.warn("[Firebase] Error deleting inquiry in Firestore:", e?.message);
    }
  }
  return deleted;
}

export function deleteInquiry(id: string): boolean {
  const inquiries = getInquiries();
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length === inquiries.length) return false;

  inMemoryInquiries = filtered;
  try {
    const { inquiries: inqPath } = getDbPaths();
    safeWrite(inqPath, JSON.stringify(filtered, null, 2));
  } catch (e) {
    console.warn("[DB] Inquiry delete exception:", e);
  }
  return true;
}

// ==========================================
// BOOKING OPERATIONS
// ==========================================
export async function getBookingsAsync(): Promise<DbBooking[]> {
  if (firestoreDb && isFirebaseConfigured) {
    try {
      const colRef = collection(firestoreDb, "bookings");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items: DbBooking[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as DbBooking);
      });
      if (items.length > 0) {
        inMemoryBookings = items;
        return items;
      }
    } catch (err: any) {
      console.warn("[Firebase] Could not fetch bookings from Firestore:", err?.message);
    }
  }
  return getBookings();
}

export function getBookings(): DbBooking[] {
  try {
    const { bookings } = getDbPaths();
    const fromFile = safeRead<DbBooking[] | null>(bookings, null);
    if (fromFile && Array.isArray(fromFile) && fromFile.length > 0) {
      inMemoryBookings = fromFile;
      return fromFile;
    }
  } catch (e) {
    console.warn("[DB] Bookings read exception:", e);
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

export async function createBookingAsync(data: Omit<DbBooking, "id" | "createdAt" | "status">): Promise<DbBooking | null> {
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
  try {
    const { bookings } = getDbPaths();
    safeWrite(bookings, JSON.stringify(inMemoryBookings, null, 2));
  } catch (e) {
    console.warn("[DB] Booking write exception:", e);
  }

  // Firebase Firestore Direct Sync
  if (firestoreDb && isFirebaseConfigured) {
    try {
      await setDoc(doc(firestoreDb, "bookings", newBooking.id), newBooking);
      console.log(`[Firebase] Booking ${newBooking.id} successfully saved to Firestore!`);
    } catch (err: any) {
      console.warn("[Firebase] Error saving booking to Firestore (Check security rules):", err?.message);
    }
  }

  return newBooking;
}

export function createBooking(data: Omit<DbBooking, "id" | "createdAt" | "status">): DbBooking | null {
  if (isSlotBooked(data.date, data.time)) {
    return null;
  }

  const newBooking: DbBooking = {
    ...data,
    id: `bk-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  };

  try {
    inMemoryBookings.unshift(newBooking);
    const { bookings } = getDbPaths();
    safeWrite(bookings, JSON.stringify(inMemoryBookings, null, 2));

    if (firestoreDb && isFirebaseConfigured) {
      setDoc(doc(firestoreDb, "bookings", newBooking.id), newBooking).catch((err) =>
        console.warn("[Firebase] Background Firestore booking write error:", err?.message)
      );
    }
  } catch (e) {
    console.warn("[DB] Booking write exception:", e);
  }
  return newBooking;
}

export async function updateBookingStatusAsync(id: string, status: DbBooking["status"]): Promise<DbBooking | null> {
  const updated = updateBookingStatus(id, status);
  if (firestoreDb && isFirebaseConfigured && updated) {
    try {
      await updateDoc(doc(firestoreDb, "bookings", id), { status });
    } catch (e: any) {
      console.warn("[Firebase] Error updating booking in Firestore:", e?.message);
    }
  }
  return updated;
}

export function updateBookingStatus(id: string, status: DbBooking["status"]): DbBooking | null {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;

  bookings[index].status = status;
  inMemoryBookings = bookings;
  try {
    const { bookings: bkPath } = getDbPaths();
    safeWrite(bkPath, JSON.stringify(bookings, null, 2));
  } catch (e) {
    console.warn("[DB] Booking update exception:", e);
  }
  return bookings[index];
}

export async function deleteBookingAsync(id: string): Promise<boolean> {
  const deleted = deleteBooking(id);
  if (firestoreDb && isFirebaseConfigured) {
    try {
      await deleteDoc(doc(firestoreDb, "bookings", id));
    } catch (e: any) {
      console.warn("[Firebase] Error deleting booking in Firestore:", e?.message);
    }
  }
  return deleted;
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  if (filtered.length === bookings.length) return false;

  inMemoryBookings = filtered;
  try {
    const { bookings: bkPath } = getDbPaths();
    safeWrite(bkPath, JSON.stringify(filtered, null, 2));
  } catch (e) {
    console.warn("[DB] Booking delete exception:", e);
  }
  return true;
}
