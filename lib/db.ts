import { firestoreDb } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
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

// In-Memory Fast Cache for Instant Lookups
let memoryInquiriesCache: DbInquiry[] = [];
let memoryBookingsCache: DbBooking[] = [];

// ==========================================
// INQUIRY OPERATIONS (100% FIRESTORE CLOUD)
// ==========================================

export async function getInquiriesAsync(): Promise<DbInquiry[]> {
  const db = firestoreDb;
  if (!db) return memoryInquiriesCache;

  try {
    const colRef = collection(db, "inquiries");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const items: DbInquiry[] = [];
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as DbInquiry;
      items.push({
        ...data,
        id: data.id || docSnap.id,
      });
    });
    
    memoryInquiriesCache = items;
    return items;
  } catch (err: any) {
    console.error("[Firestore] Error fetching inquiries:", err?.message);
    return memoryInquiriesCache;
  }
}

export async function createInquiryAsync(data: Omit<DbInquiry, "id" | "createdAt" | "status">): Promise<DbInquiry> {
  const db = firestoreDb;
  const newInquiry: DbInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  memoryInquiriesCache.unshift(newInquiry);

  if (db) {
    try {
      await setDoc(doc(db, "inquiries", newInquiry.id), newInquiry);
    } catch (err: any) {
      console.error("[Firestore] Error writing inquiry:", err?.message);
    }
  }

  return newInquiry;
}

export async function updateInquiryStatusAsync(id: string, status: DbInquiry["status"]): Promise<DbInquiry | null> {
  const db = firestoreDb;
  
  if (db) {
    try {
      await updateDoc(doc(db, "inquiries", id), { status });
    } catch (e: any) {
      try {
        const colRef = collection(db, "inquiries");
        const q = query(colRef, where("id", "==", id));
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          await updateDoc(doc(db, "inquiries", d.id), { status });
        }
      } catch (err2) {
        console.error("[Firestore] Error updating inquiry document:", err2);
      }
    }
  }

  const idx = memoryInquiriesCache.findIndex((i) => i.id === id);
  if (idx !== -1) {
    memoryInquiriesCache[idx].status = status;
    return memoryInquiriesCache[idx];
  }

  return {
    id,
    fullName: "",
    email: "",
    projectTypes: [],
    budget: "",
    timeline: "",
    scope: "",
    createdAt: new Date().toISOString(),
    status,
  };
}

export async function deleteInquiryAsync(id: string): Promise<boolean> {
  const db = firestoreDb;

  if (db) {
    try {
      await deleteDoc(doc(db, "inquiries", id));
    } catch (e: any) {
      try {
        const colRef = collection(db, "inquiries");
        const q = query(colRef, where("id", "==", id));
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          await deleteDoc(doc(db, "inquiries", d.id));
        }
      } catch (err2) {
        console.error("[Firestore] Error deleting inquiry document:", err2);
      }
    }
  }

  memoryInquiriesCache = memoryInquiriesCache.filter((i) => i.id !== id);
  return true;
}

// ==========================================
// BOOKING OPERATIONS (100% FIRESTORE CLOUD)
// ==========================================

export async function getBookingsAsync(): Promise<DbBooking[]> {
  const db = firestoreDb;
  if (!db) return memoryBookingsCache;

  try {
    const colRef = collection(db, "bookings");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const items: DbBooking[] = [];
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as DbBooking;
      items.push({
        ...data,
        id: data.id || docSnap.id,
      });
    });

    memoryBookingsCache = items;
    return items;
  } catch (err: any) {
    console.error("[Firestore] Error fetching bookings:", err?.message);
    return memoryBookingsCache;
  }
}

export async function getBookedSlotsAsync(date?: string): Promise<{ date: string; time: string }[]> {
  const bookings = await getBookingsAsync();
  const activeBookings = bookings.filter((b) => b.status !== "Cancelled");
  if (date) {
    return activeBookings
      .filter((b) => b.date === date)
      .map((b) => ({ date: b.date, time: b.time }));
  }
  return activeBookings.map((b) => ({ date: b.date, time: b.time }));
}

export async function isSlotBookedAsync(date: string, time: string): Promise<boolean> {
  const bookings = await getBookingsAsync();
  return bookings.some(
    (b) => b.date === date && b.time === time && b.status !== "Cancelled"
  );
}

export async function createBookingAsync(data: Omit<DbBooking, "id" | "createdAt" | "status">): Promise<DbBooking | null> {
  const db = firestoreDb;

  // Prevent double booking conflict
  const alreadyBooked = await isSlotBookedAsync(data.date, data.time);
  if (alreadyBooked) {
    return null;
  }

  const newBooking: DbBooking = {
    ...data,
    id: `bk-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  };

  memoryBookingsCache.unshift(newBooking);

  if (db) {
    try {
      await setDoc(doc(db, "bookings", newBooking.id), newBooking);
    } catch (err: any) {
      console.error("[Firestore] Error writing booking:", err?.message);
    }
  }

  return newBooking;
}

export async function updateBookingStatusAsync(id: string, status: DbBooking["status"]): Promise<DbBooking | null> {
  const db = firestoreDb;

  if (db) {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
    } catch (e: any) {
      try {
        const colRef = collection(db, "bookings");
        const q = query(colRef, where("id", "==", id));
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          await updateDoc(doc(db, "bookings", d.id), { status });
        }
      } catch (err2) {
        console.error("[Firestore] Error updating booking document:", err2);
      }
    }
  }

  const idx = memoryBookingsCache.findIndex((b) => b.id === id);
  if (idx !== -1) {
    memoryBookingsCache[idx].status = status;
    return memoryBookingsCache[idx];
  }

  return {
    id,
    name: "",
    email: "",
    type: "",
    date: "",
    time: "",
    platform: "",
    createdAt: new Date().toISOString(),
    status,
  };
}

export async function deleteBookingAsync(id: string): Promise<boolean> {
  const db = firestoreDb;

  if (db) {
    try {
      await deleteDoc(doc(db, "bookings", id));
    } catch (e: any) {
      try {
        const colRef = collection(db, "bookings");
        const q = query(colRef, where("id", "==", id));
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          await deleteDoc(doc(db, "bookings", d.id));
        }
      } catch (err2) {
        console.error("[Firestore] Error deleting booking document:", err2);
      }
    }
  }

  memoryBookingsCache = memoryBookingsCache.filter((b) => b.id !== id);
  return true;
}
