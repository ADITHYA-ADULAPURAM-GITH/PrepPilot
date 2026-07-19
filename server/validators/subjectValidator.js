import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const subjectIdParamSchema = z.object({
  params: z.object({
    subjectId: z.string().regex(OBJECT_ID_REGEX, "Invalid subject id"),
  }),
});

export const updateProgressSchema = z.object({
  params: z.object({
    subjectId: z.string().regex(OBJECT_ID_REGEX, "Invalid subject id"),
    topicId: z.string().regex(OBJECT_ID_REGEX, "Invalid topic id"),
  }),
  body: z
    .object({
      completed: z.boolean().optional(),
      important: z.boolean().optional(),
      notes: z.string().trim().max(2000).optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field must be provided",
    }),
});