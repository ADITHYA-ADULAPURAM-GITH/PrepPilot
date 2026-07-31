import { Router } from "express";
import * as companyController from "../controllers/companyController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  companyIdParamSchema,
  listCompaniesSchema,
  createCompanySchema,
  updateCompanySchema,
} from "../validators/companyValidator.js";

const router = Router();

router.use(requireAuth);

// Reads: any signed-in user (same as Problems/Subjects).
router.get("/", validate(listCompaniesSchema), companyController.listCompanies);
router.get("/:id", validate(companyIdParamSchema), companyController.getCompany);

// Writes: catalog data, not user-owned — restricted to admins, reusing
// the existing requireRole middleware rather than inventing a new one.
router.post("/", requireRole("admin"), validate(createCompanySchema), companyController.createCompany);
router.patch("/:id", requireRole("admin"), validate(updateCompanySchema), companyController.updateCompany);
router.delete("/:id", requireRole("admin"), validate(companyIdParamSchema), companyController.deleteCompany);

export default router;