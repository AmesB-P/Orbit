import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EventEditor } from "./event-editor";

const draft = {
  title: "",
  date: "2026-09-14",
  allDay: false,
  startTime: "09:00",
  endTime: "10:00",
  category: "work" as const,
  color: "plum" as const,
  note: "",
};

describe("EventEditor", () => {
  it("reports invalid input and saves an all-day event with null times", async () => {
    const onSave = vi.fn();

    render(
      <EventEditor
        open
        event={null}
        draft={draft}
        onOpenChange={vi.fn()}
        onSave={onSave}
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Save event" }));
    expect(await screen.findByText("Give this event a name.")).toBeVisible();

    fireEvent.change(screen.getByLabelText(/Event name/), {
      target: { value: "Day off" },
    });
    fireEvent.click(screen.getByLabelText("All-day event"));
    fireEvent.click(screen.getByRole("button", { name: "Save event" }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Day off",
          allDay: true,
          startTime: null,
          endTime: null,
        }),
      );
    });
  });
});
