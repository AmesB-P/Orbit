import { describe, expect, it } from "vitest";
import { eventFormSchema, timeOptions } from "./event-form";

const validEvent = {
  title: "Planning",
  date: "2026-09-14",
  allDay: false,
  startTime: "09:00",
  endTime: "10:00",
  category: "work" as const,
  color: "plum" as const,
  note: "",
};

describe("event form validation", () => {
  it("accepts valid timed and all-day events", () => {
    expect(eventFormSchema.safeParse(validEvent).success).toBe(true);
    expect(
      eventFormSchema.safeParse({ ...validEvent, allDay: true, startTime: null, endTime: null })
        .success,
    ).toBe(true);
  });

  it("rejects invalid time ranges and exposes 15 minute options", () => {
    expect(eventFormSchema.safeParse({ ...validEvent, endTime: "09:00" }).success).toBe(false);
    expect(eventFormSchema.safeParse({ ...validEvent, startTime: "05:45" }).success).toBe(false);
    expect(timeOptions).toContain("06:00");
    expect(timeOptions).toContain("22:00");
  });
});
