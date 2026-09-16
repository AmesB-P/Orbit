import { CaretLeftIcon, CaretRightIcon, CrosshairIcon, PlusIcon } from "@phosphor-icons/react";
import { addDays, format } from "date-fns";
import { weekStart } from "@/lib/calendar";

type PlannerMode = "week" | "day";

export function PlannerHeader({
  mode,
  anchor,
  selected,
  eventCount,
  focusMinutes,
  onNavigate,
  onToday,
  onAddEvent,
  onAddFocus,
}: {
  mode: PlannerMode;
  anchor: Date;
  selected: Date;
  eventCount: number;
  focusMinutes: number;
  onNavigate: (amount: number) => void;
  onToday: () => void;
  onAddEvent: () => void;
  onAddFocus: () => void;
}) {
  const start = weekStart(anchor);
  const weekHeading = `Week of ${format(start, "MMMM d")}`;
  const compactWeekHeading = `${format(start, "MMM d")}–${format(addDays(start, 6), "d")}`;
  const heading = mode === "week" ? weekHeading : format(selected, "EEEE, MMMM d");

  return (
    <header className="orbit-reveal grid gap-4 border-b border-border pb-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-6">
      <div className="min-w-0 rounded-feature bg-ink px-5 py-6 text-white sm:px-7 sm:py-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-event-marker">
          PERSONAL PLANNING STUDIO
        </p>
        <h1 className="mt-4 font-editorial text-5xl font-semibold leading-[0.8] sm:text-7xl">
          Orbit
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/75">
          Protecting room for the work and life that deserves your full attention.
        </p>
      </div>

      <div className="flex min-h-[280px] min-w-0 flex-col justify-between rounded-feature border border-border bg-control/55 p-5 sm:p-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.1em] text-event-muted">
            {mode === "week" ? "CURRENT WEEK" : "SELECTED DAY"}
          </p>
          <h2 className="mt-2 min-w-0 font-editorial text-4xl font-semibold leading-none lg:text-[clamp(1.5rem,3vw,2.75rem)]">
            {mode === "week" ? (
              <>
                <span className="whitespace-nowrap sm:hidden" aria-label={weekHeading}>
                  {compactWeekHeading}
                </span>
                <span className="hidden whitespace-nowrap sm:inline">{weekHeading}</span>
              </>
            ) : (
              heading
            )}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
            <div>
              <p className="font-mono text-[10px] text-event-muted">EVENTS</p>
              <p className="mt-1 text-2xl font-semibold">{eventCount}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-event-muted">FOCUS HELD</p>
              <p className="mt-1 text-2xl font-semibold">
                {focusMinutes ? `${Math.floor(focusMinutes / 60)}h ${focusMinutes % 60}m` : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
          <div
            className="col-span-2 flex w-full justify-center rounded-small border border-border-strong bg-control p-1 xl:col-span-1 xl:w-auto xl:justify-start"
            aria-label="Change date"
          >
            <button
              type="button"
              aria-label="Previous period"
              onClick={() => onNavigate(-1)}
              className="grid size-10 place-items-center rounded-small transition hover:bg-event-surface active:translate-y-px"
            >
              <CaretLeftIcon size={18} />
            </button>
            <button
              type="button"
              onClick={onToday}
              className="min-h-10 px-3 text-sm font-semibold transition hover:bg-event-surface active:translate-y-px"
            >
              Today
            </button>
            <button
              type="button"
              aria-label="Next period"
              onClick={() => onNavigate(1)}
              className="grid size-10 place-items-center rounded-small transition hover:bg-event-surface active:translate-y-px"
            >
              <CaretRightIcon size={18} />
            </button>
          </div>
          <button
            type="button"
            onClick={onAddFocus}
            className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-small border border-focus-accent px-3 text-sm font-semibold text-focus-accent transition hover:bg-focus-soft active:translate-y-px"
          >
            <CrosshairIcon size={18} />
            Focus time
          </button>
          <button
            type="button"
            onClick={onAddEvent}
            className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-small bg-selected px-3 text-sm font-semibold text-white transition hover:bg-plum-hover active:translate-y-px"
          >
            <PlusIcon size={18} />
            Add event
          </button>
        </div>
      </div>
    </header>
  );
}
