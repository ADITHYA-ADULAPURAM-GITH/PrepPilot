import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const languageEnum = z.enum(["javascript", "python"]);

export const workspaceParamsSchema = z.object({
  params: z.object({ problemId: z.string().regex(OBJECT_ID_REGEX, "Invalid problem id") }),
});

export const runSubmitSchema = z.object({
  params: z.object({ problemId: z.string().regex(OBJECT_ID_REGEX, "Invalid problem id") }),
  body: z.object({
    language: languageEnum,
    code: z.string().trim().min(1, "Code is required").max(20000),
  }),
});
