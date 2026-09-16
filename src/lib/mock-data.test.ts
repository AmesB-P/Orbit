import { addDays } from "date-fns";
import { describe, expect, it } from "vitest";
import { dateKey, weekStart } from "./calendar";
import { seedEvents } from "./mock-data";

describe("seedEvents", () => {
  it("creates a stable set of relative events for the current week", () => {
    const now = new Date(2026, 8, 16, 12);
    const events = seedEvents(now);

    expect(events).toHaveLength(7);
    expect(events[0]).toMatchObject({
      id: "seed-1",
      date: dateKey(weekStart(now)),
    });
    expect(events.at(-1)?.date).toBe(dateKey(addDays(weekStart(now), 5)));
    expect(events.at(-1)?.startTime).toBeNull();
    expect(events.at(-1)?.endTime).toBeNull();
  });
});
