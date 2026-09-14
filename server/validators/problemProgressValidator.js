import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const statusEnum = z.enum(["assigned", "in-progress", "solved"]);

export const progressIdParamSchema = z.object({
  params: z.object({ id: z.string().regex(OBJECT_ID_REGEX, "Invalid progress id") }),
});

export const listProgressSchema = z.object({
  query: z.object({
    status: statusEnum.optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  }),
});

export const updateProgressSchema = z.object({
  params: z.object({ id: z.string().regex(OBJECT_ID_REGEX, "Invalid progress id") }),
  body: z
    .object({
      notes: z.string().trim().max(2000).optional(),
      status: statusEnum.optional(),
    })
    .refine((body) => Object.keys(body).length > 0, { message: "At least one field must be provided" }),
});