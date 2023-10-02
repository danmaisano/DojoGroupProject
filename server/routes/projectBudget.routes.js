import express from "express";
const router = express.Router();
import projectBudgetController from "../controllers/projectBudget.controller.js";
// import verifyUser from "../../middleware/verifyUser.js";

// Get all project budgets
router.get("/", projectBudgetController.getAllProjectBudgets);

// Get a specific project budget by ID
router.get("/:id", projectBudgetController.getProjectBudgetById);

// Create a new project budget
router.post("/", projectBudgetController.createProjectBudget);

// Update an existing project budget
router.put("/:id", projectBudgetController.updateProjectBudget);

// Delete a project budget
router.delete("/:id", projectBudgetController.deleteProjectBudget);

export default router;
