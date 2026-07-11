import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const difficultyEnum = z.enum(["Easy", "Medium", "Hard"]);
const statusEnum = z.enum(["Todo", "Solved"]);

const idParam = z.object({
  id: z.string().regex(OBJECT_ID_REGEX, "Invalid problem id"),
});

export const createProblemSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    platform: z.string().trim().max(60).optional(),
    problemUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
    topic: z.string().trim().min(1, "Topic is required").max(60),
    difficulty: difficultyEnum,
    notes: z.string().trim().max(2000).optional(),
  }),
});

export const updateProblemSchema = z.object({
  params: idParam,
  body: z
    .object({
      title: z.string().trim().min(1).max(200).optional(),
      platform: z.string().trim().max(60).optional(),
      problemUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
      topic: z.string().trim().min(1).max(60).optional(),
      difficulty: difficultyEnum.optional(),
      status: statusEnum.optional(),
      notes: z.string().trim().max(2000).optional(),
      revisionCount: z.coerce.number().int().min(0).optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field must be provided",
    }),
});

export const problemIdParamSchema = z.object({
  params: idParam,
});

export const listProblemsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(200).optional(),
    topic: z.string().trim().max(60).optional(),
    difficulty: difficultyEnum.optional(),
    status: statusEnum.optional(),
    sort: z.enum(["newest", "oldest", "title", "difficulty"]).optional().default("newest"),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  }),
});