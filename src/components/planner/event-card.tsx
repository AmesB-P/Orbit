import { eventCategoryMeta, eventColorMeta } from "@/lib/event-meta";
import { eventRange, formatTime } from "@/lib/calendar";
import type { CalendarEvent } from "@/lib/types";

export function EventCard({
  event,
  compact = false,
  onEdit,
}: {
  event: CalendarEvent;
  compact?: boolean;
  onEdit: (event: CalendarEvent) => void;
}) {
  const { Icon, label } = eventCategoryMeta[event.category];

  return (
    <button
      type="button"
      onClick={() => onEdit(event)}
      className={`group relative w-full overflow-hidden rounded-small bg-event-surface p-3 text-left text-ink shadow-card transition duration-200 hover:-translate-y-px hover:shadow-card-hover active:translate-y-px ${compact ? "h-full" : "min-h-16"}`}
      aria-label={`Edit ${event.title}, ${label}, ${eventRange(event)}`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${eventColorMeta[event.color].className}`} />
      <div className="ml-1 min-w-0">
        <p className="truncate text-sm font-semibold">{event.title}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-event-muted">
          <Icon size={14} weight="bold" aria-hidden="true" />
          <span>{label}</span>
          <span className="font-mono text-[10px]" aria-label={eventRange(event)}>
            {event.allDay
              ? "ALL DAY"
              : `${formatTime(event.startTime)}–${formatTime(event.endTime)}`}
          </span>
        </p>
      </div>
    </button>
  );
}
