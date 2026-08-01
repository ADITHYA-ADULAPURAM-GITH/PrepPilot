import { Router } from "express";
import * as studyTaskController from "../controllers/studyTaskController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import {
  studyTaskIdParamSchema,
  listStudyTasksSchema,
  createStudyTaskSchema,
  updateStudyTaskSchema,
} from "../validators/studyTaskValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/", validate(listStudyTasksSchema), studyTaskController.listStudyTasks);
router.get("/:id", validate(studyTaskIdParamSchema), studyTaskController.getStudyTask);
router.post("/", validate(createStudyTaskSchema), studyTaskController.createStudyTask);
router.patch("/:id", validate(updateStudyTaskSchema), studyTaskController.updateStudyTask);
router.delete("/:id", validate(studyTaskIdParamSchema), studyTaskController.deleteStudyTask);

export default router;