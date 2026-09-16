import { z } from "zod";
import { eventCategories, eventColors, type CalendarEvent, type StoredCalendar } from "./types";

const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  allDay: z.boolean(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  category: z.enum(eventCategories),
  color: z.enum(eventColors),
  note: z.string().optional(),
});
const storageSchema = z.object({
  version: z.literal(1),
  events: z.array(eventSchema),
});

export type CalendarReadResult =
  { calendar: StoredCalendar; invalid: false } | { calendar?: undefined; invalid: boolean };
export const STORAGE_KEY = "orbit.events.v1";
export function readCalendar(): CalendarReadResult {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { invalid: false };

    const parsed = storageSchema.safeParse(JSON.parse(raw));
    return parsed.success ? { calendar: parsed.data, invalid: false } : { invalid: true };
  } catch {
    return { invalid: true };
  }
}

export function writeCalendar(events: CalendarEvent[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, events }));
    return true;
  } catch {
    return false;
  }
}

export function clearCalendar() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
