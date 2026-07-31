import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const companyIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(OBJECT_ID_REGEX, "Invalid company id"),
  }),
});

export const listCompaniesSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),
    tag: z.string().trim().max(60).optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  }),
});

export const createCompanySchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    logoUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
    website: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
    description: z.string().trim().max(2000).optional(),
    eligibilityCriteria: z.string().trim().max(1000).optional(),
    importantTopics: z.array(z.string().trim().max(60)).optional(),
    interviewRounds: z.array(z.string().trim().max(80)).optional(),
    tags: z.array(z.string().trim().max(40)).optional(),
  }),
});

export const updateCompanySchema = z.object({
  params: z.object({
    id: z.string().regex(OBJECT_ID_REGEX, "Invalid company id"),
  }),
  body: z
    .object({
      name: z.string().trim().min(1).max(100).optional(),
      logoUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
      website: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
      description: z.string().trim().max(2000).optional(),
      eligibilityCriteria: z.string().trim().max(1000).optional(),
      importantTopics: z.array(z.string().trim().max(60)).optional(),
      interviewRounds: z.array(z.string().trim().max(80)).optional(),
      tags: z.array(z.string().trim().max(40)).optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field must be provided",
    }),
});