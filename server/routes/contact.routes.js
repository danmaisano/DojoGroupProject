import express from "express";
const router = express.Router();
import contactController from "../controllers/contact.controller.js";
import checkPermission from "../middleware/checkPermission.js";
import verifyUser from "../middleware/verifyUser.js";

router.get("/user/:id", verifyUser, checkPermission('readOwn', 'contact'), contactController.getAllContacts);
router.get("/company/:id", verifyUser, checkPermission('readOwn', 'contact'), contactController.getAllContactsByCompany);
router.get("/company/:id/opportunity/:opportunity_id", verifyUser, checkPermission('readOwn', 'contact'), contactController.getAllContactsByCompanyAndOpportunity);
router.get("/:id", verifyUser, checkPermission('readOwn', 'contact'), contactController.getContact);
router.post("/create", verifyUser, checkPermission('createOwn', 'contact'), contactController.createContact);
router.put("/:id", verifyUser, checkPermission('updateOwn', 'contact'), contactController.updateContact);
router.delete("/:id", verifyUser, checkPermission('deleteOwn', 'contact'), contactController.deleteContact);

export default router;