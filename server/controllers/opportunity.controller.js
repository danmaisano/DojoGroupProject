import Opportunity from "../models/opportunity.js";
import User from "../models/user.js";

const opportunityController = {
  getAllOpportunities: async (req, res) => {
    try {
      const companyId = req.params.id;
      const opportunities = await Opportunity.findAll({ where: { company_id: companyId } });
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

  // Get all opportunities associated with a contact
  getOpportunitiesByContactId: async (req, res) => {
    try {
      const contactId = req.params.id;
      const opportunities = await Opportunity.findAll({ where: { contact_id: contactId } });
      return res.json({ opportunities });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
      .status(500)
      .json({ error: "Failed to retrieve opportunities" });
    }
  },

  createOpportunity: async (req, res) => {
    try {
      // Assuming the userId of the logged-in user is available in the request (e.g., from a JWT payload or session)
      const userId = req.user.id;
      
      // Fetch the user details based on userId
      const user = await User.findByPk(userId);
  
      // If user doesn't exist or doesn't belong to a company, throw an error
      if (!user || !user.company_id) {
        return res.status(400).json({ error: "User not associated with a company" });
      }
      // Create the new opportunity with the company_id from the user
      const newOpportunity = await Opportunity.create({
        ...req.body,
        company_id: user.company_id,
      });
  
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
