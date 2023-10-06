import express from "express";
const router = express.Router();
import companyController from "../controllers//company.controller.js";

router.get("/companies", companyController.getAllCompanies);
router.post("/companies", companyController.addCompany);
router.get("/companies/:id", companyController.getCompany);
router.put("/companies/:id", companyController.updateCompany);
router.delete("/companies/:id", companyController.deleteCompany);

export default router;
