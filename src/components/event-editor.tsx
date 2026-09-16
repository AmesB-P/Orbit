"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, FloppyDiskIcon, TrashIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DeleteConfirmation } from "@/components/delete-confirmation";
import { eventColorMeta, eventCategoryMeta } from "@/lib/event-meta";
import { eventFormSchema, type EventFormValues, timeOptions } from "@/lib/event-form";
import { eventCategories, eventColors, type CalendarEvent, type EventDraft } from "@/lib/types";

const fieldClass =
  "mt-2 min-h-11 w-full appearance-none rounded-small border border-border-strong bg-control px-3 text-sm text-ink transition duration-200 focus:border-selected";

export function EventEditor({
  open,
  event,
  draft,
  onOpenChange,
  onSave,
  onDelete,
}: {
  open: boolean;
  event: CalendarEvent | null;
  draft: EventDraft;
  onOpenChange: (open: boolean) => void;
  onSave: (event: CalendarEvent | EventDraft) => void;
  onDelete: (event: CalendarEvent) => void;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ?? draft,
  });
  const allDay = useWatch({ control: form.control, name: "allDay" });
  useEffect(() => {
    form.reset(event ?? draft);
  }, [event, draft, form, open]);
  const submit = (values: EventFormValues) =>
    onSave({
      ...values,
      startTime: values.allDay ? null : values.startTime,
      endTime: values.allDay ? null : values.endTime,
      note: values.note?.trim() || undefined,
      ...(event ? { id: event.id } : {}),
    });
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--layer-overlay)] bg-ink/35 data-[state=open]:animate-[orbit-fade-in_180ms_ease-out]" />
        <Dialog.Content
          aria-describedby="event-editor-description"
          className="fixed inset-x-1 bottom-0 z-[var(--layer-dialog)] max-h-dvh overflow-hidden rounded-t-feature bg-surface shadow-[0_-12px_32px_rgba(48,42,81,0.2)] data-[state=open]:animate-[orbit-sheet-up_200ms_ease-out] sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90dvh] sm:w-[min(560px,calc(100vw-40px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-feature"
        >
          <div className="max-h-dvh h-full overflow-y-auto overscroll-contain p-5 sm:max-h-[90dvh] sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="font-editorial text-4xl font-semibold leading-none">
                  {event ? "Edit event" : "Add event"}
                </Dialog.Title>
                <Dialog.Description
                  id="event-editor-description"
                  className="mt-1 text-sm text-event-muted"
                >
                  Choose a time and category. Category names stay visible in the planner.
                </Dialog.Description>
              </div>
              <Dialog.Close
                aria-label="Close event editor"
                className="grid size-11 shrink-0 place-items-center rounded-small text-ink transition duration-200 hover:bg-event-surface active:translate-y-px"
              >
                <XIcon size={22} />
              </Dialog.Close>
            </div>
            <form noValidate onSubmit={form.handleSubmit(submit)} className="space-y-5">
              <label className="block text-sm font-semibold">
                Event name
                <input
                  autoFocus
                  className={fieldClass}
                  maxLength={80}
                  {...form.register("title")}
                  aria-invalid={Boolean(form.formState.errors.title)}
                  aria-describedby={form.formState.errors.title ? "title-error" : undefined}
                />
                {form.formState.errors.title && (
                  <span id="title-error" className="mt-1 block text-sm text-danger">
                    {form.formState.errors.title.message}
                  </span>
                )}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  Date
                  <input
                    className={fieldClass}
                    type="date"
                    {...form.register("date")}
                    aria-invalid={Boolean(form.formState.errors.date)}
                  />
                </label>
                <label className="flex min-h-11 items-center gap-3 self-end rounded-small border border-[#cfc8dc] bg-white px-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    className="size-4 accent-selected"
                    {...form.register("allDay")}
                  />
                  All-day event
                </label>
              </div>
              {!allDay && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold">
                    Start time
                    <select
                      className={fieldClass}
                      {...form.register("startTime")}
                      aria-invalid={Boolean(form.formState.errors.startTime)}
                      aria-describedby={
                        form.formState.errors.startTime ? "start-time-error" : undefined
                      }
                    >
                      {timeOptions.map((value) => (
                        <option key={value} value={value}>
                          {new Date(`2000-01-01T${value}`).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.startTime && (
                      <span id="start-time-error" className="mt-1 block text-sm text-danger">
                        {form.formState.errors.startTime.message}
                      </span>
                    )}
                  </label>
                  <label className="block text-sm font-semibold">
                    End time
                    <select
                      className={fieldClass}
                      {...form.register("endTime")}
                      aria-invalid={Boolean(form.formState.errors.endTime)}
                      aria-describedby={
                        form.formState.errors.endTime ? "end-time-error" : undefined
                      }
                    >
                      {timeOptions.map((value) => (
                        <option key={value} value={value}>
                          {new Date(`2000-01-01T${value}`).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.endTime && (
                      <span id="end-time-error" className="mt-1 block text-sm text-danger">
                        {form.formState.errors.endTime.message}
                      </span>
                    )}
                  </label>
                </div>
              )}
              <label className="block text-sm font-semibold">
                Category
                <select className={fieldClass} {...form.register("category")}>
                  {eventCategories.map((category) => (
                    <option key={category} value={category}>
                      {eventCategoryMeta[category].label}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset>
                <legend className="text-sm font-semibold">Color marker</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {eventColors.map((color) => (
                    <label
                      key={color}
                      className="relative flex min-h-11 cursor-pointer items-center gap-2 rounded-small border border-border-strong bg-control px-3 text-sm transition duration-200 hover:border-selected has-[:checked]:border-selected has-[:checked]:bg-event-surface"
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        value={color}
                        {...form.register("color")}
                      />
                      <span
                        className={`size-4 rounded-full ${eventColorMeta[color].className}`}
                        aria-hidden="true"
                      />
                      {eventColorMeta[color].label}
                      <CheckIcon
                        className="ml-auto hidden size-4 text-selected [input:checked~&]:block"
                        aria-hidden="true"
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm font-semibold">
                Note <span className="font-normal text-event-muted">(optional)</span>
                <textarea
                  className={`${fieldClass} min-h-24 resize-none py-3`}
                  maxLength={500}
                  {...form.register("note")}
                  aria-invalid={Boolean(form.formState.errors.note)}
                  aria-describedby={form.formState.errors.note ? "note-error" : undefined}
                />
                {form.formState.errors.note && (
                  <span id="note-error" className="mt-1 block text-sm text-danger">
                    {form.formState.errors.note.message}
                  </span>
                )}
              </label>
              {confirmingDelete && event ? (
                <DeleteConfirmation
                  onConfirm={() => onDelete(event)}
                  onCancel={() => setConfirmingDelete(false)}
                />
              ) : (
                <div className="flex flex-col-reverse gap-3 border-t border-[#ded8e8] pt-5 sm:flex-row sm:justify-between">
                  <div>
                    {event && (
                      <button
                        type="button"
                        onClick={() => setConfirmingDelete(true)}
                        className="flex min-h-11 items-center gap-2 rounded-small px-3 text-sm font-semibold text-danger transition duration-200 hover:bg-focus-soft active:translate-y-px"
                      >
                        <TrashIcon size={18} />
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="min-h-11 rounded-small px-4 text-sm font-semibold hover:bg-event-surface active:translate-y-px"
                      >
                        Cancel
                      </button>
                    </Dialog.Close>
                    <button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="flex min-h-11 items-center gap-2 rounded-small bg-selected px-4 text-sm font-bold text-white transition duration-200 hover:bg-plum-hover disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px"
                    >
                      <FloppyDiskIcon size={18} />
                      {form.formState.isSubmitting ? "Saving" : "Save event"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
