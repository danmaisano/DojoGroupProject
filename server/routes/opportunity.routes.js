import express from "express";
const router = express.Router();
import opportunityController from "../controllers/opportunity.controller.js";
import checkPermission from "../middleware/checkPermission.js";
import verifyUser from "../middleware/verifyUser.js";


router.get("/company/:id", verifyUser, checkPermission('readAny', 'opportunity'), opportunityController.getAllOpportunities);
router.get("/contact/:id", verifyUser, checkPermission('readOwn', 'opportunity'), opportunityController.getOpportunitiesByContactId);
router.get("/:id", verifyUser, checkPermission('readAny', 'opportunity'), opportunityController.getOpportunityById);
router.post("/create", verifyUser, checkPermission('createOwn', 'opportunity'), opportunityController.createOpportunity);
router.put("/:id", verifyUser, checkPermission('updateAny', 'opportunity'), opportunityController.updateOpportunity);
router.delete("/:id", verifyUser, checkPermission('deleteOwn', 'opportunity'), opportunityController.deleteOpportunity);

export default router;
