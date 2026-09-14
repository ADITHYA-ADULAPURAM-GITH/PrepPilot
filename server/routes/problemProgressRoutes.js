import { Router } from "express";
import * as problemProgressController from "../controllers/problemProgressController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import {
  listProgressSchema,
  updateProgressSchema,
} from "../validators/problemProgressValidator.js";
import {
  workspaceParamsSchema,
  runSubmitSchema,
} from "../validators/problemWorkspaceValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/stats", problemProgressController.getProgressStats);
router.get("/", validate(listProgressSchema), problemProgressController.listProgress);
router.patch("/:id", validate(updateProgressSchema), problemProgressController.updateProgress);

router.get("/:problemId/workspace", validate(workspaceParamsSchema), problemProgressController.getWorkspace);
router.post("/:problemId/run", validate(runSubmitSchema), problemProgressController.runCode);
router.post("/:problemId/submit", validate(runSubmitSchema), problemProgressController.submitCode);
router.get("/:problemId/attempts", validate(workspaceParamsSchema), problemProgressController.listAttempts);

export default router;