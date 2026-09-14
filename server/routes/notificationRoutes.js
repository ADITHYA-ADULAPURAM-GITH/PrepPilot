import { Router } from "express";
import * as notificationController from "../controllers/notificationController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import {
  notificationIdParamSchema,
  listNotificationsSchema,
} from "../validators/notificationValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/unread-count", notificationController.getUnreadCount);
router.get("/", validate(listNotificationsSchema), notificationController.listNotifications);
router.patch("/read-all", notificationController.markAllNotificationsRead);
router.patch("/:id/read", validate(notificationIdParamSchema), notificationController.markNotificationRead);

export default router;