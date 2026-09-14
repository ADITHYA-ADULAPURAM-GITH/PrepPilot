import { z } from "zod";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const notificationIdParamSchema = z.object({
  params: z.object({ id: z.string().regex(OBJECT_ID_REGEX, "Invalid notification id") }),
});

export const listNotificationsSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  }),
});