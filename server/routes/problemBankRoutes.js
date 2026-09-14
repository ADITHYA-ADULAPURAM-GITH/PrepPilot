import { Router } from "express";
import * as problemBankController from "../controllers/problemBankController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import {
  listProblemBankSchema,
  problemBankIdParamSchema,
  selectProblemsSchema,
} from "../validators/problemBankValidator.js";

const router = Router();

router.use(requireAuth);

router.post("/select", validate(selectProblemsSchema), problemBankController.selectProblems);
router.get("/", validate(listProblemBankSchema), problemBankController.listProblemBank);
router.get("/:id", validate(problemBankIdParamSchema), problemBankController.getProblemBankById);

export default router;