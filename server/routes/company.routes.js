import express from "express";
const router = express.Router();
import companyController from "../controllers//company.controller.js";
import checkPermission from "../middleware/checkPermission.js";
import verifyUser from "../middleware/verifyUser.js";


router.get("/companies", verifyUser, checkPermission('readAny', 'company'), companyController.getAllCompanies);
router.post("/companies", verifyUser, checkPermission('createOwn', 'company'), companyController.addCompany);
router.get("/companies/:id", verifyUser, checkPermission('readOwn', 'company'), companyController.getCompany);
router.put("/companies/:id", verifyUser, checkPermission('updateOwn','company'), companyController.updateCompany);
router.delete("/companies/:id", verifyUser, checkPermission('deleteOwn','company'), companyController.deleteCompany);

export default router;
