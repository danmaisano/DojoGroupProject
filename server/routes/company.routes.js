import express from "express";
const router = express.Router();
import companyController from "../controllers//company.controller.js";
import checkPermission from "../middleware/checkPermission.js";
import verifyUser from "../middleware/verifyUser.js";


router.post("/", verifyUser, checkPermission('createOwn', 'company'), companyController.addCompany);
router.get("/:id", verifyUser, checkPermission('readOwn', 'company'), companyController.getCompany);
router.put("/:id", verifyUser, checkPermission('updateOwn','company'), companyController.updateCompany);
router.delete("/:id", verifyUser, checkPermission('deleteOwn','company'), companyController.deleteCompany);
router.get("/companies/all", verifyUser, checkPermission('readAny', 'company'), companyController.getAllCompanies)

export default router;
