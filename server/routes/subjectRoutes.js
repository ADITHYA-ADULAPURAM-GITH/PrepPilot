import { Router } from "express";
import * as subjectController from "../controllers/subjectController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import { subjectIdParamSchema, updateProgressSchema } from "../validators/subjectValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/stats", subjectController.getSubjectStats);
router.get("/analytics", subjectController.getSubjectAnalytics);
router.get("/", subjectController.listSubjects);
router.get("/:subjectId/topics", validate(subjectIdParamSchema), subjectController.getSubjectTopics);
router.patch(
  "/:subjectId/topics/:topicId/progress",
  validate(updateProgressSchema),
  subjectController.updateTopicProgress
);

export default router;