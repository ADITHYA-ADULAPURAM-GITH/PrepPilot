import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const objectId = (label) => z.string().regex(OBJECT_ID_REGEX, `Invalid ${label} id`);

export const mockTestIdParamSchema = z.object({
  params: z.object({ id: objectId("mock test") }),
});

export const attemptIdParamSchema = z.object({
  params: z.object({ attemptId: objectId("attempt") }),
});

export const listMockTestsSchema = z.object({
  query: z.object({
    category: z.enum(["Aptitude", "SQL", "Python", "DSA", "Company-specific"]).optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  }),
});

export const listAttemptsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  }),
});

export const saveAnswerSchema = z.object({
  params: z.object({ attemptId: objectId("attempt") }),
  body: z.object({
    questionId: objectId("question"),
    // null is valid — explicitly clearing/skipping an answer, not the
    // same as the field being absent.
    selectedOptionIndex: z.number().int().min(0).nullable(),
  }),
});

export const submitAttemptSchema = z.object({
  params: z.object({ attemptId: objectId("attempt") }),
  body: z
    .object({
      autoSubmitted: z.boolean().optional().default(false),
    })
    .optional()
    .default({}),
});