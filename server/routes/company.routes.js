import express from "express";
const router = express.Router();
import companyController from "../controllers//company.controller.js";
import checkPermission from "../middleware/checkPermission.js";

router.get("/companies", checkPermission('readAny', 'company'), companyController.getAllCompanies);
router.post("/companies", checkPermission('createOwn', 'company'), companyController.addCompany);
router.get("/companies/:id", checkPermission('readOwn', 'company'), companyController.getCompany);
router.put("/companies/:id", checkPermission('updateOwn','company'), companyController.updateCompany);
router.delete("/companies/:id", checkPermission('deleteOwn','company'), companyController.deleteCompany);

export default router;
