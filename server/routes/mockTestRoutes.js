import { Router } from "express";
import * as mockTestController from "../controllers/mockTestController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import {
  mockTestIdParamSchema,
  attemptIdParamSchema,
  listMockTestsSchema,
  listAttemptsSchema,
  saveAnswerSchema,
  submitAttemptSchema,
} from "../validators/mockTestValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/", validate(listMockTestsSchema), mockTestController.listMockTests);
router.get("/attempts", validate(listAttemptsSchema), mockTestController.listUserAttempts);
router.get("/attempts/:attemptId", validate(attemptIdParamSchema), mockTestController.getAttempt);
router.get(
  "/attempts/:attemptId/questions",
  validate(attemptIdParamSchema),
  mockTestController.getAttemptQuestions
);
router.patch(
  "/attempts/:attemptId/answer",
  validate(saveAnswerSchema),
  mockTestController.saveAnswer
);
router.post(
  "/attempts/:attemptId/submit",
  validate(submitAttemptSchema),
  mockTestController.submitAttempt
);
router.get("/:id", validate(mockTestIdParamSchema), mockTestController.getMockTest);
router.post("/:id/start", validate(mockTestIdParamSchema), mockTestController.startAttempt);

export default router;