import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const PRIORITY_ENUM = ["Low", "Medium", "High"];
const CATEGORY_ENUM = ["DSA", "CS Subjects", "Aptitude", "Interview Prep", "Development", "Other"];

export const studyTaskIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(OBJECT_ID_REGEX, "Invalid task id"),
  }),
});

export const listStudyTasksSchema = z.object({
  query: z.object({
    category: z.enum(CATEGORY_ENUM).optional(),
    priority: z.enum(PRIORITY_ENUM).optional(),
    isCompleted: z.coerce.boolean().optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  }),
});

export const createStudyTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required").max(150),
    description: z.string().trim().max(1000).optional(),
    dueDate: z.coerce.date({ errorMap: () => ({ message: "Enter a valid due date" }) }),
    priority: z.enum(PRIORITY_ENUM).optional().default("Medium"),
    category: z.enum(CATEGORY_ENUM).optional().default("Other"),
  }),
});

export const updateStudyTaskSchema = z.object({
  params: z.object({
    id: z.string().regex(OBJECT_ID_REGEX, "Invalid task id"),
  }),
  body: z
    .object({
      title: z.string().trim().min(1).max(150).optional(),
      description: z.string().trim().max(1000).optional(),
      dueDate: z.coerce.date({ errorMap: () => ({ message: "Enter a valid due date" }) }).optional(),
      priority: z.enum(PRIORITY_ENUM).optional(),
      category: z.enum(CATEGORY_ENUM).optional(),
      isCompleted: z.boolean().optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field must be provided",
    }),
});