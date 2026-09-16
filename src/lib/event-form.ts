import { z } from "zod";
import { DAY_END, DAY_START, minutesToTime, timeToMinutes } from "./calendar";
import { eventCategories, eventColors } from "./types";

export const eventFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Give this event a name.")
      .max(80, "Keep the title under 80 characters."),
    date: z.string().min(1, "Choose a date."),
    allDay: z.boolean(),
    startTime: z.string().nullable(),
    endTime: z.string().nullable(),
    category: z.enum(eventCategories),
    color: z.enum(eventColors),
    note: z.string().max(500, "Keep the note under 500 characters.").optional(),
  })
  .superRefine((value, context) => {
    if (value.allDay) return;

    if (!value.startTime || !value.endTime) {
      context.addIssue({
        code: "custom",
        message: "Choose a start and end time.",
        path: ["startTime"],
      });
      return;
    }

    const start = timeToMinutes(value.startTime);
    const end = timeToMinutes(value.endTime);

    if (start < DAY_START || end > DAY_END || start % 15 || end % 15) {
      context.addIssue({
        code: "custom",
        message: "Use 15-minute times between 6:00 AM and 10:00 PM.",
        path: ["startTime"],
      });
    }

    if (end <= start) {
      context.addIssue({
        code: "custom",
        message: "End time must be after start time.",
        path: ["endTime"],
      });
    }
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;

export const timeOptions = Array.from({ length: (DAY_END - DAY_START) / 15 + 1 }, (_, index) =>
  minutesToTime(DAY_START + index * 15),
);
