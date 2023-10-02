import ProjectBudget from "../models/projectBudget.js";

const projectBudgetController = {
  getAllProjectBudgets: async (req, res) => {
    try {
      const projectBudgets = await ProjectBudget.findAll();
      return res.json({ projectBudgets });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
        .status(500)
        .json({ error: "Failed to retrieve project budgets" });
    }
  },

  getProjectBudgetById: async (req, res) => {
    try {
      const projectBudget = await ProjectBudget.findByPk(req.params.id);
      if (!projectBudget)
        return res.status(404).json({ error: "Project budget not found" });
      return res.json({ projectBudget });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
        .status(500)
        .json({ error: "Failed to retrieve project budget" });
    }
  },

  createProjectBudget: async (req, res) => {
    try {
      const newProjectBudget = await ProjectBudget.create(req.body);
      return res.status(201).json({ newProjectBudget });
    } catch (error) {
      console.error("Error occurred during creation:", error);
      return res.status(500).json({ error: "Failed to create project budget" });
    }
  },

  updateProjectBudget: async (req, res) => {
    try {
      const projectBudget = await ProjectBudget.findByPk(req.params.id);
      if (!projectBudget)
        return res.status(404).json({ error: "Project budget not found" });
      await projectBudget.update(req.body);
      return res.json({ projectBudget });
    } catch (error) {
      console.error("Error occurred during update:", error);
      return res.status(500).json({ error: "Failed to update project budget" });
    }
  },

  deleteProjectBudget: async (req, res) => {
    try {
      const projectBudget = await ProjectBudget.findByPk(req.params.id);
      if (!projectBudget)
        return res.status(404).json({ error: "Project budget not found" });
      await projectBudget.destroy();
      return res.json({ message: "Project budget deleted" });
    } catch (error) {
      console.error("Error occurred during deletion:", error);
      return res.status(500).json({ error: "Failed to delete project budget" });
    }
  },
};

export default projectBudgetController;
