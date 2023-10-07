import Company from "../models/company.js";
import User from "../models/user.js";

const companyController = {
  // View all companies
  getAllCompanies: async (req, res) => {
    try {
      const companies = await Company.findAll();
      return res.json({ Status: "Success", companies });
    } catch (error) {
      console.error("Error occurred while fetching companies:", error);
      return res.status(500).json({ Status: "Failed to fetch companies" });
    }
  },

  addCompany: async (req, res) => {
    try {
      const company = await Company.create({
        company_name: req.body.company_name,
      });
        
    } catch (error) {
      console.error("Error occurred while adding company:", error);
      return res.status(500).json({ Status: "Failed to add company" });
    }
  },

  // Get a specific company by ID (including its users)
  getCompany: async (req, res) => {
    try {
      const company = await Company.findOne({
        where: { id: req.params.id },
        include: [{ model: User, as: "users" }],
      });
      if (!company) {
        return res.status(404).json({ Status: "Company not found" });
      }
      return res.json({ Status: "Success", company });
    } catch (error) {
      console.error("Error occurred while fetching company:", error);
      return res.status(500).json({ Status: "Failed to fetch company" });
    }
  },

  // Update company details
  updateCompany: async (req, res) => {
    try {
      const company = await Company.findOne({
        where: { id: req.params.id },
      });
      if (!company) {
        return res.status(404).json({ Status: "Company not found" });
      }
  
      // Ensure the user is an admin for the company they're trying to modify
      const user = await User.findByPk(req.user.id);
      if (user.company_id !== company.id || user.role !== "admin") {
        return res.status(403).json({ Status: "Access denied" });
      }
  
      company.company_name = req.body.company_name || company.company_name;
      await company.save();
      return res.json({
        Status: "Success",
        message: "Company updated",
        company,
      });
    } catch (error) {
      console.error("Error occurred during company update:", error);
      return res.status(500).json({ Status: "Failed to update company" });
    }
  },

  // Delete a company by its ID
  deleteCompany: async (req, res) => {
    try {
      const company = await Company.findOne({
        where: { id: req.params.id },
      });
      if (!company) {
        return res.status(404).json({ Status: "Company not found" });
      }
      const user = await User.findByPk(req.user.id);
      if (user.company_id !== company.id || user.role !== "admin") {
        return res.status(403).json({ Status: "Access denied" });
      }
      await company.destroy();
      return res.json({ Status: "Success", message: "Company deleted" });
    } catch (error) {
      console.error("Error occurred during company deletion:", error);
      return res.status(500).json({ Status: "Failed to delete company" });
    }
  },
};

export default companyController;
