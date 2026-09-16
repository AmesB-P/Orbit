export const eventCategories = ["focus", "work", "personal", "appointment"] as const;
export const eventColors = ["plum", "lavender", "slate", "terracotta"] as const;
export type EventCategory = (typeof eventCategories)[number];
export type EventColor = (typeof eventColors)[number];
export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  allDay: boolean;
  startTime: string | null;
  endTime: string | null;
  category: EventCategory;
  color: EventColor;
  note?: string;
};

export type StoredCalendar = {
  version: 1;
  events: CalendarEvent[];
};
export type EventDraft = Omit<CalendarEvent, "id">;
