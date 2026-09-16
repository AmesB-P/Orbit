"use client";

import { addDays } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  dateKey,
  defaultDraft,
  eventsForDate,
  safeDate,
  shiftWeek,
  timeToMinutes,
  weekDays,
} from "@/lib/calendar";
import { seedEvents } from "@/lib/mock-data";
import { clearCalendar, readCalendar, writeCalendar } from "@/lib/storage";
import type { CalendarEvent, EventDraft } from "@/lib/types";

type PlannerMode = "week" | "day";

export type EditorState = {
  event: CalendarEvent | null;
  draft: EventDraft;
};

export function useCalendarPlanner(mode: PlannerMode, initialDate?: string) {
  const [anchor, setAnchor] = useState(() => safeDate(initialDate));
  const [selected, setSelected] = useState(() => safeDate(initialDate));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [editor, setEditor] = useState<EditorState | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readCalendar();

      if (stored.invalid) {
        setStorageError(true);
      } else {
        const nextEvents = stored.calendar?.events ?? seedEvents();
        setEvents(nextEvents);
        if (!stored.calendar && !writeCalendar(nextEvents)) {
          setStorageError(true);
        }
      }

      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const activeWeekEvents = useMemo(
    () => weekDays(anchor).flatMap((day) => eventsForDate(events, day)),
    [anchor, events],
  );
  const focusMinutes = useMemo(
    () =>
      activeWeekEvents
        .filter((event) => event.category === "focus" && !event.allDay)
        .reduce(
          (total, event) =>
            total +
            timeToMinutes(event.endTime ?? "00:00") -
            timeToMinutes(event.startTime ?? "00:00"),
          0,
        ),
    [activeWeekEvents],
  );

  const persist = useCallback((nextEvents: CalendarEvent[]) => {
    setEvents(nextEvents);
    if (!writeCalendar(nextEvents)) setStorageError(true);
  }, []);

  const openNew = useCallback(
    (date = selected, time = "09:00", focus = false) => {
      setEditor({ event: null, draft: defaultDraft(date, time, focus) });
    },
    [selected],
  );

  const save = useCallback(
    (incoming: CalendarEvent | EventDraft) => {
      const nextEvents =
        "id" in incoming
          ? events.map((event) => (event.id === incoming.id ? incoming : event))
          : [...events, { ...incoming, id: crypto.randomUUID() }];
      persist(nextEvents);
      setEditor(null);
    },
    [events, persist],
  );

  const remove = useCallback(
    (event: CalendarEvent) => {
      persist(events.filter((item) => item.id !== event.id));
      setEditor(null);
    },
    [events, persist],
  );

  const reset = useCallback(() => {
    const nextEvents = seedEvents();
    if (clearCalendar() && writeCalendar(nextEvents)) {
      setEvents(nextEvents);
      setStorageError(false);
    } else {
      setStorageError(true);
    }
  }, []);

  const navigate = useCallback(
    (amount: number) => {
      const nextDate = mode === "week" ? shiftWeek(anchor, amount) : addDays(selected, amount);
      setAnchor(nextDate);
      setSelected(nextDate);
    },
    [anchor, mode, selected],
  );

  const goToToday = useCallback(() => {
    const today = new Date();
    setAnchor(today);
    setSelected(today);
  }, []);

  return {
    anchor,
    selected,
    events,
    hydrated,
    storageError,
    editor,
    activeWeekEvents,
    focusMinutes,
    setSelected,
    setEditor,
    openNew,
    save,
    remove,
    reset,
    navigate,
    goToToday,
    selectedDateKey: dateKey(selected),
  };
}
