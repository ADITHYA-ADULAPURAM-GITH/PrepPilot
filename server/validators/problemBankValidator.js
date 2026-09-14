import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const difficultyEnum = z.enum(["Easy", "Medium", "Hard"]);

export const problemBankIdParamSchema = z.object({
  params: z.object({ id: z.string().regex(OBJECT_ID_REGEX, "Invalid problem id") }),
});

export const listProblemBankSchema = z.object({
  query: z.object({
    topic: z.string().trim().max(60).optional(),
    difficulty: difficultyEnum.optional(),
    source: z.string().trim().max(60).optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  }),
});

// count capped at 20 — my own choice, not something you specified.
// Purely to stop one request from mass-assigning the whole bank; raise
// it if a real use case needs more.
export const selectProblemsSchema = z.object({
  body: z.object({
    topics: z.array(z.string().trim().min(1)).min(1, "At least one topic is required"),
    difficulty: difficultyEnum.optional(),
    count: z.coerce.number().int().min(1).max(20),
    source: z.string().trim().max(60).optional(),
  }),
});