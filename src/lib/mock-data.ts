import { addDays } from "date-fns";
import { dateKey, weekStart } from "./calendar";
import type { CalendarEvent } from "./types";
export function seedEvents(now = new Date()): CalendarEvent[] {
  const monday = weekStart(now);
  const make = (
    id: string,
    day: number,
    title: string,
    startTime: string | null,
    endTime: string | null,
    category: CalendarEvent["category"],
    color: CalendarEvent["color"],
    allDay = false,
    note?: string,
  ): CalendarEvent => ({
    id,
    title,
    date: dateKey(addDays(monday, day)),
    startTime,
    endTime,
    category,
    color,
    allDay,
    note,
  });
  return [
    make("seed-1", 0, "Plan the week", "09:00", "09:45", "work", "plum"),
    make(
      "seed-2",
      0,
      "Focus time",
      "10:00",
      "11:30",
      "focus",
      "terracotta",
      false,
      "Quiet time for the launch outline.",
    ),
    make("seed-3", 1, "Dentist appointment", "14:00", "15:00", "appointment", "lavender"),
    make("seed-4", 2, "Portfolio review", "11:00", "12:00", "work", "slate"),
    make("seed-5", 3, "Focus time", "09:30", "11:00", "focus", "terracotta"),
    make("seed-6", 4, "Dinner with Mali", "19:00", "20:30", "personal", "lavender"),
    make("seed-7", 5, "Clear the desk", null, null, "personal", "plum", true),
  ];
}
