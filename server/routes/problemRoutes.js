import { Router } from "express";
import * as problemController from "../controllers/problemController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import {
  createProblemSchema,
  updateProblemSchema,
  listProblemsSchema,
  problemIdParamSchema,
} from "../validators/problemValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/stats", problemController.getProblemStats);
router.get("/", validate(listProblemsSchema), problemController.listProblems);
router.get("/:id", validate(problemIdParamSchema), problemController.getProblem);
router.post("/", validate(createProblemSchema), problemController.createProblem);
router.patch("/:id", validate(updateProblemSchema), problemController.updateProblem);
router.delete("/:id", validate(problemIdParamSchema), problemController.deleteProblem);

export default router;