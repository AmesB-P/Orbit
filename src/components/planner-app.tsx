"use client";

import { EventEditor } from "./event-editor";
import { DayAgenda } from "./planner/day-agenda";
import { MobileWeek } from "./planner/mobile-week";
import { PlannerHeader } from "./planner/planner-header";
import { PlannerViewNav } from "./planner/view-nav";
import { WeekGrid } from "./planner/week-grid";
import { useCalendarPlanner } from "@/hooks/use-calendar-planner";
import { eventsForDate } from "@/lib/calendar";

type PlannerMode = "week" | "day";

function PlannerLoadingState() {
  return (
    <main className="min-h-[100dvh] bg-canvas p-5 sm:p-8 lg:p-14">
      <div className="mx-auto max-w-[1184px] rounded-feature bg-surface p-6 shadow-panel">
        <div className="h-24 animate-pulse rounded-feature bg-event-surface" />
        <div className="mt-6 h-[640px] animate-pulse rounded-feature bg-today" />
      </div>
    </main>
  );
}

export function PlannerApp({ mode, initialDate }: { mode: PlannerMode; initialDate?: string }) {
  const planner = useCalendarPlanner(mode, initialDate);

  if (!planner.hydrated) return <PlannerLoadingState />;

  return (
    <main className="min-h-[100dvh] bg-canvas p-5 sm:p-8 lg:p-14">
      <div className="mx-auto max-w-[1184px] rounded-feature bg-surface p-5 shadow-panel sm:p-8">
        <PlannerHeader
          mode={mode}
          anchor={planner.anchor}
          selected={planner.selected}
          eventCount={planner.activeWeekEvents.length}
          focusMinutes={planner.focusMinutes}
          onNavigate={planner.navigate}
          onToday={planner.goToToday}
          onAddEvent={() => planner.openNew()}
          onAddFocus={() => planner.openNew(planner.selected, "09:00", true)}
        />

        {planner.storageError ? (
          <aside
            className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-small border border-focus-accent bg-danger-soft p-3 text-sm"
            role="alert"
          >
            <span>Orbit could not read or save your local calendar.</span>
            <button
              type="button"
              onClick={planner.reset}
              className="min-h-11 rounded-small bg-control px-3 font-semibold text-danger shadow-card transition hover:bg-focus-soft"
            >
              Reset sample calendar
            </button>
          </aside>
        ) : null}

        <PlannerViewNav mode={mode} selected={planner.selected} />

        <div className="mt-6">
          {mode === "week" ? (
            <>
              <WeekGrid
                anchor={planner.anchor}
                events={planner.events}
                onEdit={(event) => planner.setEditor({ event, draft: event })}
                onEmptySlot={planner.openNew}
              />
              <MobileWeek
                anchor={planner.anchor}
                selected={planner.selected}
                events={planner.events}
                onSelect={planner.setSelected}
                onEdit={(event) => planner.setEditor({ event, draft: event })}
                onEmptySlot={planner.openNew}
              />
            </>
          ) : (
            <DayAgenda
              date={planner.selected}
              events={eventsForDate(planner.events, planner.selected)}
              onEdit={(event) => planner.setEditor({ event, draft: event })}
              onEmptySlot={planner.openNew}
            />
          )}
        </div>
      </div>

      {planner.editor ? (
        <EventEditor
          open
          event={planner.editor.event}
          draft={planner.editor.draft}
          onOpenChange={(open) => !open && planner.setEditor(null)}
          onSave={planner.save}
          onDelete={planner.remove}
        />
      ) : null}
    </main>
  );
}
