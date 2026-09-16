import { format, isSameDay } from "date-fns";
import { dateKey, eventsForDate, weekDays } from "@/lib/calendar";
import type { CalendarEvent } from "@/lib/types";
import { DayAgenda } from "./day-agenda";

export function MobileWeek({
  anchor,
  selected,
  events,
  onSelect,
  onEdit,
  onEmptySlot,
}: {
  anchor: Date;
  selected: Date;
  events: CalendarEvent[];
  onSelect: (date: Date) => void;
  onEdit: (event: CalendarEvent) => void;
  onEmptySlot: (date: Date, time: string) => void;
}) {
  return (
    <div className="lg:hidden">
      <div
        className="-mx-5 mb-7 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
        role="tablist"
        aria-label="Days of this week"
      >
        {weekDays(anchor).map((day) => {
          const active = isSameDay(day, selected);
          return (
            <button
              key={dateKey(day)}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(day)}
              className={`min-h-16 min-w-16 rounded-full px-3 text-center transition duration-200 active:translate-y-px ${active ? "bg-selected text-white shadow-card-hover" : "border border-border bg-control/60 hover:border-selected hover:bg-event-surface"}`}
            >
              <span className="block font-mono text-[10px] tracking-[0.06em]">
                {format(day, "EEE")}
              </span>
              <span className="mt-1 block text-lg font-semibold">{format(day, "d")}</span>
            </button>
          );
        })}
      </div>
      <DayAgenda
        date={selected}
        events={eventsForDate(events, selected)}
        title={false}
        onEdit={onEdit}
        onEmptySlot={onEmptySlot}
      />
    </div>
  );
}
