import { BriefcaseIcon, CalendarBlankIcon, CrosshairIcon, UserIcon } from "@phosphor-icons/react";
import type { EventCategory, EventColor } from "./types";

export const eventCategoryMeta: Record<
  EventCategory,
  { label: string; Icon: typeof CrosshairIcon }
> = {
  focus: { label: "Focus", Icon: CrosshairIcon },
  work: { label: "Work", Icon: BriefcaseIcon },
  personal: { label: "Personal", Icon: UserIcon },
  appointment: { label: "Appointment", Icon: CalendarBlankIcon },
};

export const eventColorMeta: Record<EventColor, { label: string; className: string }> = {
  plum: { label: "Plum", className: "bg-event-marker" },
  lavender: { label: "Lavender", className: "bg-[#b7a7cd]" },
  slate: { label: "Slate", className: "bg-[#718094]" },
  terracotta: { label: "Terracotta", className: "bg-focus-accent" },
};
