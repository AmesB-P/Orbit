import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEY, clearCalendar, readCalendar, writeCalendar } from "./storage";
import type { CalendarEvent } from "./types";

const event: CalendarEvent = {
  id: "event-1",
  title: "Planning",
  date: "2026-09-14",
  allDay: false,
  startTime: "09:00",
  endTime: "10:00",
  category: "work",
  color: "plum",
};

describe("calendar storage", () => {
  beforeEach(() => localStorage.clear());

  it("round-trips a versioned calendar", () => {
    expect(writeCalendar([event])).toBe(true);
    expect(readCalendar()).toEqual({ calendar: { version: 1, events: [event] }, invalid: false });
  });

  it("reports invalid stored data and can clear persisted events", () => {
    localStorage.setItem(STORAGE_KEY, "not-json");
    expect(readCalendar()).toEqual({ invalid: true });
    expect(clearCalendar()).toBe(true);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
