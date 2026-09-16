import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DayAgenda } from "./day-agenda";

describe("DayAgenda", () => {
  it("offers a useful empty state and operable time slots", () => {
    const onEmptySlot = vi.fn();
    const date = new Date(2026, 8, 14, 12);

    render(<DayAgenda date={date} events={[]} onEdit={vi.fn()} onEmptySlot={onEmptySlot} title />);

    expect(screen.getByText("A clear field of time.")).toBeVisible();

    const slot = screen.getByRole("button", { name: "Add event at 6:00 AM" });
    fireEvent.click(slot);

    expect(onEmptySlot).toHaveBeenCalledWith(date, "06:00");
  });
});
