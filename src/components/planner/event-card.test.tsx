import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EventCard } from "./event-card";

const event = {
  id: "event-1",
  title: "Plan sprint",
  date: "2026-09-14",
  allDay: false,
  startTime: "09:00",
  endTime: "10:00",
  category: "work" as const,
  color: "plum" as const,
};

describe("EventCard", () => {
  it("identifies the event with readable category text and opens it", () => {
    const onEdit = vi.fn();

    render(<EventCard event={event} onEdit={onEdit} />);

    expect(screen.getByText("Work")).toBeVisible();
    expect(screen.getByLabelText("9:00 AM - 10:00 AM")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: /edit plan sprint/i }));

    expect(onEdit).toHaveBeenCalledWith(event);
  });
});
