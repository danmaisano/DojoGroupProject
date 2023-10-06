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

  // Add a new company
  addCompany: async (req, res) => {
    try {
      const company = await Company.create({
        company_name: req.body.company_name,
      });
      return res.json({
        Status: "Success",
        message: "Company added successfully",
        company,
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
      await company.destroy();
      return res.json({ Status: "Success", message: "Company deleted" });
    } catch (error) {
      console.error("Error occurred during company deletion:", error);
      return res.status(500).json({ Status: "Failed to delete company" });
    }
  },
};

export default companyController;
