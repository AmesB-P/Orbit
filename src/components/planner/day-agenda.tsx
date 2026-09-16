import Link from "next/link";
import { ClockIcon } from "@phosphor-icons/react";
import { format } from "date-fns";
import { DAY_START, formatTime, timeToMinutes } from "@/lib/calendar";
import type { CalendarEvent } from "@/lib/types";
import { EventCard } from "./event-card";
import { TimeLabel } from "./time-label";

const weekViewClass =
  "inline-flex min-h-11 items-center justify-center rounded-small border border-border-strong bg-control px-2.5 text-[13px] font-semibold leading-none transition duration-200 hover:border-selected hover:bg-event-surface active:translate-y-px";

export function DayAgenda({
  date,
  events,
  title = true,
  onEdit,
  onEmptySlot,
}: {
  date: Date;
  events: CalendarEvent[];
  title?: boolean;
  onEdit: (event: CalendarEvent) => void;
  onEmptySlot: (date: Date, time: string) => void;
}) {
  const allDayEvents = events.filter((event) => event.allDay);
  const timedEvents = events.filter((event) => !event.allDay);

  return (
    <section aria-labelledby={title ? "agenda-heading" : undefined}>
      {title ? (
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.08em] text-event-muted">DAILY AGENDA</p>
            <h2
              id="agenda-heading"
              className="mt-1 font-editorial text-4xl font-semibold leading-none sm:text-5xl"
            >
              {format(date, "EEEE, MMMM d")}
            </h2>
          </div>
          <Link href="/" className={weekViewClass}>
            Week view
          </Link>
        </div>
      ) : null}

      {allDayEvents.length > 0 ? (
        <div className="mb-6 rounded-feature border border-border bg-control/50 p-4">
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] text-event-muted">ALL DAY</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {allDayEvents.map((event) => (
              <EventCard key={event.id} event={event} onEdit={onEdit} />
            ))}
          </div>
        </div>
      ) : null}

      {events.length === 0 ? (
        <div className="rounded-feature border border-dashed border-border-strong bg-control/50 px-6 py-12 text-center">
          <ClockIcon size={30} className="mx-auto text-event-muted" aria-hidden="true" />
          <h3 className="mt-4 font-editorial text-3xl font-semibold">A clear field of time.</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-event-muted">
            Choose an open hour to give something your full attention.
          </p>
        </div>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-small border border-border bg-control/30">
        {Array.from({ length: 16 }, (_, index) => {
          const minutes = DAY_START + index * 60;
          const time = `${Math.floor(minutes / 60)
            .toString()
            .padStart(2, "0")}:00`;
          const eventsAtHour = timedEvents.filter(
            (event) => Math.floor(timeToMinutes(event.startTime ?? "00:00") / 60) * 60 === minutes,
          );

          return (
            <div
              key={time}
              className="grid min-h-24 grid-cols-[72px_minmax(0,1fr)] border-b border-border last:border-b-0"
            >
              <div className="flex justify-end border-r border-border px-2 pt-3">
                <TimeLabel time={time} />
              </div>
              <div className="relative min-w-0">
                {eventsAtHour.length > 0 ? (
                  <div className="space-y-2 py-2 pr-2">
                    {eventsAtHour.map((event) => (
                      <EventCard key={event.id} event={event} onEdit={onEdit} />
                    ))}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onEmptySlot(date, time)}
                    className="absolute inset-0 w-full text-left text-sm text-event-muted opacity-0 transition duration-200 hover:bg-event-surface/60 hover:pl-3 hover:opacity-100 focus:bg-event-surface/60 focus:pl-3 focus:opacity-100"
                  >
                    Add event at {formatTime(time)}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
