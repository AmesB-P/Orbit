import { addDays, addWeeks, format, isValid, parseISO, startOfWeek } from "date-fns";
import type { CalendarEvent, EventDraft } from "./types";

export const DAY_START = 6 * 60;
export const DAY_END = 22 * 60;
export const SLOT_MINUTES = 15;
export function safeDate(value?: string) {
  const parsed = value ? parseISO(value) : new Date();
  return isValid(parsed) ? parsed : new Date();
}
export function dateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}
export function weekStart(date: Date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}
export function weekDays(date: Date) {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart(date), index));
}
export function shiftWeek(date: Date, amount: number) {
  return addWeeks(date, amount);
}
export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
export function minutesToTime(minutes: number) {
  return `${Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`;
}
export function formatTime(time: string | null) {
  return time ? format(new Date(`2000-01-01T${time}`), "h:mm a") : "All day";
}
export function eventRange(event: CalendarEvent) {
  return event.allDay ? "All day" : `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
}
export function eventsForDate(events: CalendarEvent[], date: Date) {
  return events
    .filter((event) => event.date === dateKey(date))
    .sort(
      (a, b) =>
        Number(b.allDay) - Number(a.allDay) || (a.startTime ?? "").localeCompare(b.startTime ?? ""),
    );
}
export function eventPosition(event: CalendarEvent, pixelsPerMinute: number) {
  const start = Math.max(DAY_START, timeToMinutes(event.startTime ?? "06:00"));
  const end = Math.min(DAY_END, timeToMinutes(event.endTime ?? "22:00"));
  return {
    top: (start - DAY_START) * pixelsPerMinute,
    height: Math.max(48, (end - start) * pixelsPerMinute),
  };
}
export function eventLanes(events: CalendarEvent[]) {
  const sorted = [...events].sort((a, b) => (a.startTime ?? "").localeCompare(b.startTime ?? ""));
  const placements: { event: CalendarEvent; lane: number; count: number }[] = [];
  const active: { end: number; lane: number }[] = [];
  for (const event of sorted) {
    const start = timeToMinutes(event.startTime ?? "00:00");
    const end = timeToMinutes(event.endTime ?? "00:00");
    for (let i = active.length - 1; i >= 0; i--) if (active[i].end <= start) active.splice(i, 1);
    const used = new Set(active.map((item) => item.lane));
    let lane = 0;
    while (used.has(lane)) lane++;
    active.push({ end, lane });
    const count = Math.max(...active.map((item) => item.lane)) + 1;
    placements.push({ event, lane, count });
  }
  return placements;
}
export function defaultDraft(date: Date, startTime = "09:00", focus = false): EventDraft {
  const start = timeToMinutes(startTime);
  return {
    title: focus ? "Focus time" : "",
    date: dateKey(date),
    allDay: false,
    startTime,
    endTime: minutesToTime(Math.min(start + (focus ? 90 : 60), DAY_END)),
    category: focus ? "focus" : "work",
    color: focus ? "terracotta" : "plum",
    note: "",
  };
}
