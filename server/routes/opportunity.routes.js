import express from "express";
const router = express.Router();
import opportunityController from "../controllers/opportunity.controller.js";
// import verifyUser from "../../middleware/verifyUser.js";

// Get all opportunities
router.get("/", opportunityController.getAllOpportunities);

// Get a specific opportunity by ID
router.get("/:id", opportunityController.getOpportunityById);

// Create a new opportunity
router.post("/", opportunityController.createOpportunity);

// Update an existing opportunity
router.put("/:id", opportunityController.updateOpportunity);

// Delete an opportunity
router.delete("/:id", opportunityController.deleteOpportunity);

export default router;
