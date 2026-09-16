import { format, isSameDay } from "date-fns";
import {
  DAY_END,
  DAY_START,
  dateKey,
  eventLanes,
  eventPosition,
  eventsForDate,
  formatTime,
  weekDays,
} from "@/lib/calendar";
import type { CalendarEvent } from "@/lib/types";
import { EventCard } from "./event-card";
import { TimeLabel } from "./time-label";

const pixelsPerMinute = 1.05;
const gridHeight = (DAY_END - DAY_START) * pixelsPerMinute;
const gridColumns = "72px repeat(7, minmax(132px, 1fr))";

export function WeekGrid({
  anchor,
  events,
  onEdit,
  onEmptySlot,
}: {
  anchor: Date;
  events: CalendarEvent[];
  onEdit: (event: CalendarEvent) => void;
  onEmptySlot: (date: Date, time: string) => void;
}) {
  const days = weekDays(anchor);

  return (
    <div className="hidden overflow-x-auto lg:block">
      <div className="min-w-[980px] overflow-hidden rounded-feature border border-border bg-control/40">
        <div className="grid border-b border-border" style={{ gridTemplateColumns: gridColumns }}>
          <div />
          {days.map((day) => (
            <div
              key={dateKey(day)}
              className={`border-l border-border px-3 pb-3 text-center ${isSameDay(day, new Date()) ? "bg-today" : ""}`}
            >
              <p className="pt-3 font-mono text-[10px] tracking-[0.08em] text-event-muted">
                {format(day, "EEE")}
              </p>
              <p
                className={`mt-1 inline-grid size-9 place-items-center rounded-full text-base font-semibold ${isSameDay(day, new Date()) ? "bg-selected text-white shadow-card" : ""}`}
              >
                {format(day, "d")}
              </p>
            </div>
          ))}
        </div>

        <div className="grid border-b border-border" style={{ gridTemplateColumns: gridColumns }}>
          <div className="p-2 font-mono text-[10px] tracking-[0.06em] text-event-muted">
            ALL DAY
          </div>
          {days.map((day) => (
            <div key={dateKey(day)} className="min-h-18 border-l border-border p-2">
              {eventsForDate(events, day)
                .filter((event) => event.allDay)
                .map((event) => (
                  <div key={event.id} className="mb-2">
                    <EventCard event={event} compact onEdit={onEdit} />
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: gridColumns }}>
          <div className="relative" style={{ height: gridHeight }}>
            {Array.from({ length: 16 }, (_, index) => (
              <TimeLabel
                key={index}
                className="absolute inset-x-0 flex justify-end pr-2"
                time={`${(index + 6).toString().padStart(2, "0")}:00`}
                style={{ top: index * 60 * pixelsPerMinute + 12 }}
              />
            ))}
          </div>
          {days.map((day) => {
            const timedEvents = eventsForDate(events, day).filter((event) => !event.allDay);

            return (
              <div
                key={dateKey(day)}
                className="relative border-l border-border"
                style={{ height: gridHeight }}
              >
                {Array.from({ length: 16 }, (_, index) => {
                  const time = `${(index + 6).toString().padStart(2, "0")}:00`;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => onEmptySlot(day, time)}
                      className="absolute inset-x-0 border-b border-border/75 text-left opacity-0 transition duration-200 hover:bg-event-surface/60 hover:opacity-100 focus:bg-event-surface/60 focus:opacity-100"
                      style={{
                        top: index * 60 * pixelsPerMinute,
                        height: 60 * pixelsPerMinute,
                      }}
                      aria-label={`Add event on ${format(day, "EEEE, MMMM d")} at ${formatTime(time)}`}
                    >
                      <span className="pl-2 text-xs text-event-muted">Add event</span>
                    </button>
                  );
                })}
                {eventLanes(timedEvents).map(({ event, lane, count }) => {
                  const position = eventPosition(event, pixelsPerMinute);
                  return (
                    <div
                      key={event.id}
                      className="absolute z-[var(--layer-event)] px-1"
                      style={{
                        top: position.top,
                        height: position.height,
                        left: `${(lane / count) * 100}%`,
                        width: `${100 / count}%`,
                      }}
                    >
                      <EventCard event={event} compact onEdit={onEdit} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
