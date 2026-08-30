import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RollingBookingDate {
  day: string;
  dateStr: string;
  label: string;
  value: string;
}

/**
 * Automatically calculates the next upcoming business days (Mon-Fri) rolling forward every day & week.
 */
export function getUpcomingBookingDates(count = 7): RollingBookingDate[] {
  const dates: RollingBookingDate[] = [];
  const now = new Date();
  
  // Start from tomorrow
  let current = new Date(now);
  current.setDate(current.getDate() + 1);

  while (dates.length < count) {
    const dayOfWeek = current.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Business days: Monday (1) through Friday (5)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const day = current.toLocaleDateString("en-US", { weekday: "short" });
      const month = current.toLocaleDateString("en-US", { month: "short" });
      const dayNum = String(current.getDate()).padStart(2, "0");
      const year = current.getFullYear();
      const monthNum = String(current.getMonth() + 1).padStart(2, "0");
      
      const value = `${year}-${monthNum}-${dayNum}`;
      const dateStr = `${month} ${dayNum}`;
      const label = `${day}, ${dateStr}`;

      dates.push({ day, dateStr, label, value });
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
