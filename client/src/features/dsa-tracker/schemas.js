import { z } from "zod";

export const problemSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  platform: z.string().trim().max(60).optional().or(z.literal("")),
  problemUrl: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  topic: z.string().trim().min(1, "Topic is required").max(60),
  difficulty: z.enum(["Easy", "Medium", "Hard"], { message: "Select a difficulty" }),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});