import type { CSSProperties } from "react";
import { formatTime } from "@/lib/calendar";

export function TimeLabel({
  time,
  className = "",
  style,
}: {
  time: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`whitespace-nowrap font-mono text-[11px] leading-none text-event-muted ${className}`}
      style={style}
    >
      {formatTime(time).replace(" ", "\u00a0")}
    </span>
  );
}
