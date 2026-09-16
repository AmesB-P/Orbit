import Link from "next/link";
import { dateKey } from "@/lib/calendar";

const viewTabClass =
  "inline-flex h-10 min-w-16 items-center justify-center rounded-full px-3 text-[13px] font-semibold leading-none transition duration-200 active:translate-y-px";

export function PlannerViewNav({ mode, selected }: { mode: "week" | "day"; selected: Date }) {
  return (
    <div className="orbit-reveal orbit-reveal-delay mt-6 flex flex-wrap items-center justify-between gap-4">
      <nav className="flex gap-2" aria-label="Planner views">
        <Link
          href="/"
          aria-current={mode === "week" ? "page" : undefined}
          className={`${viewTabClass} ${mode === "week" ? "bg-selected text-white shadow-card" : "border border-selected bg-control text-event-muted hover:bg-event-surface"}`}
        >
          Week
        </Link>
        <Link
          href={`/day/${dateKey(selected)}`}
          aria-current={mode === "day" ? "page" : undefined}
          className={`${viewTabClass} ${mode === "day" ? "bg-selected text-white shadow-card" : "border border-selected bg-control text-event-muted hover:bg-event-surface"}`}
        >
          Day
        </Link>
      </nav>
      <p className="font-mono text-[11px] tracking-[0.07em] text-event-muted">MONDAY — SUNDAY</p>
    </div>
  );
}
