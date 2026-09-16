import { describe, expect, it } from "vitest";
import {
  dateKey,
  defaultDraft,
  eventLanes,
  eventPosition,
  eventsForDate,
  formatTime,
  weekDays,
  weekStart,
} from "./calendar";
import type { CalendarEvent } from "./types";

const timedEvent = (id: string, startTime: string, endTime: string): CalendarEvent => ({
  id,
  title: id,
  date: "2026-09-14",
  allDay: false,
  startTime,
  endTime,
  category: "work",
  color: "plum",
});

describe("calendar utilities", () => {
  it("starts weeks on Monday and creates seven local date keys", () => {
    const start = weekStart(new Date("2026-09-16T12:00:00"));
    expect(dateKey(start)).toBe("2026-09-14");
    expect(weekDays(start).map(dateKey)).toEqual([
      "2026-09-14",
      "2026-09-15",
      "2026-09-16",
      "2026-09-17",
      "2026-09-18",
      "2026-09-19",
      "2026-09-20",
    ]);
  });

  it("sorts all-day events before timed events", () => {
    const allDay = {
      ...timedEvent("all-day", "09:00", "10:00"),
      allDay: true,
      startTime: null,
      endTime: null,
    };
    const morning = timedEvent("morning", "09:00", "10:00");
    const early = timedEvent("early", "08:00", "09:00");

    expect(
      eventsForDate([morning, allDay, early], new Date("2026-09-14T12:00:00")).map(
        (event) => event.id,
      ),
    ).toEqual(["all-day", "early", "morning"]);
  });

  it("calculates grid positions, lanes, and focus defaults", () => {
    expect(eventPosition(timedEvent("event", "09:00", "10:00"), 1)).toEqual({
      top: 180,
      height: 60,
    });
    expect(
      eventLanes([timedEvent("one", "09:00", "10:00"), timedEvent("two", "09:15", "10:15")]).map(
        (placement) => placement.lane,
      ),
    ).toEqual([0, 1]);
    expect(defaultDraft(new Date("2026-09-14T12:00:00"), "09:00", true)).toMatchObject({
      title: "Focus time",
      endTime: "10:30",
      category: "focus",
    });
    expect(formatTime("09:30")).toBe("9:30 AM");
  });
});
