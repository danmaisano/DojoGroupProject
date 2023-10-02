import Opportunity from "../models/opportunity.js";

const opportunityController = {
  getAllOpportunities: async (req, res) => {
    try {
      const opportunities = await Opportunity.findAll();
      return res.json({ opportunities });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
        .status(500)
        .json({ error: "Failed to retrieve opportunities" });
    }
  },

  getOpportunityById: async (req, res) => {
    try {
      const opportunity = await Opportunity.findByPk(req.params.id);
      if (!opportunity)
        return res.status(404).json({ error: "Opportunity not found" });
      return res.json({ opportunity });
    } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).json({ error: "Failed to retrieve opportunity" });
    }
  },

  createOpportunity: async (req, res) => {
    try {
      const newOpportunity = await Opportunity.create(req.body);
      return res.status(201).json({ newOpportunity });
    } catch (error) {
      console.error("Error occurred during creation:", error);
      return res.status(500).json({ error: "Failed to create opportunity" });
    }
  },

  updateOpportunity: async (req, res) => {
    try {
      const opportunity = await Opportunity.findByPk(req.params.id);
      if (!opportunity)
        return res.status(404).json({ error: "Opportunity not found" });
      await opportunity.update(req.body);
      return res.json({ opportunity });
    } catch (error) {
      console.error("Error occurred during update:", error);
      return res.status(500).json({ error: "Failed to update opportunity" });
    }
  },

  deleteOpportunity: async (req, res) => {
    try {
      const opportunity = await Opportunity.findByPk(req.params.id);
      if (!opportunity)
        return res.status(404).json({ error: "Opportunity not found" });
      await opportunity.destroy();
      return res.json({ message: "Opportunity deleted" });
    } catch (error) {
      console.error("Error occurred during deletion:", error);
      return res.status(500).json({ error: "Failed to delete opportunity" });
    }
  },
};

export default opportunityController;
