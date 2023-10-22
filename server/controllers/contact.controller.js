import Contact from "../models/contacts.js";
import User from "../models/user.js";

const contactController = {
    // Create a new contact
    createContact: async (req, res) => {
        try {
            const contact = await Contact.create(req.body);
            return res.json({ Status: "Success", contact });
        } catch (error) {
            console.error("Error occurred while creating contact:", error);
            return res.status(500).json({ Status: "Failed to create contact" });
        }
    },

    // View all contacts
    getAllContacts: async (req, res) => {
        try {
            const contacts = await Contact.findAll();
            return res.json({ Status: "Success", contacts });
        } catch (error) {
            console.error("Error occurred while fetching contacts:", error);
            return res.status(500).json({ Status: "Failed to fetch contacts" });
        }
    },

    // Get all contacts by User ID
    getAllContactsByUser: async (req, res) => {
        try {
            const contacts = await Contact.findAll({
                where: { user_id: req.params.id },
            });
            if (!contacts) {
                return res.status(404).json({ Status: "Contacts not found" });
            }
            return res.json({ Status: "Success", contacts });
        } catch (error) {
            console.error("Error occurred while fetching contacts:", error);
            return res.status(500).json({ Status: "Failed to fetch contacts" });
        }
    },

    // Get all contacts by company ID
    getAllContactsByCompany: async (req, res) => {
        try {
            const contacts = await Contact.findAll({
                where: { company_id: req.params.id },
            });
            if (!contacts) {
                return res.status(404).json({ Status: "Contacts not found" });
            }
            return res.json({ Status: "Success", contacts });
        } catch (error) {
            console.error("Error occurred while fetching contacts:", error);
            return res.status(500).json({ Status: "Failed to fetch contacts" });
        }
    },

    // Get all contacts by company ID and opportunity ID
    getAllContactsByCompanyAndOpportunity: async (req, res) => {
        try {
            const contacts = await Contact.findAll({
                where: { company_id: req.params.id, opportunity_id: req.params.opportunity_id },
            });
            if (!contacts) {
                return res.status(404).json({ Status: "Contacts not found" });
            }
            return res.json({ Status: "Success", contacts });
        } catch (error) {
            console.error("Error occurred while fetching contacts:", error);
            return res.status(500).json({ Status: "Failed to fetch contacts" });
        }
    },

    // Get a specific contact by ID
    getContact: async (req, res) => {
        try {
            const contact = await Contact.findOne({
                where: { id: req.params.id },
            });
            if (!contact) {
                return res.status(404).json({ Status: "Contact not found" });
            }
            return res.json({ Status: "Success", contact });
        } catch (error) {
            console.error("Error occurred while fetching contact:", error);
            return res.status(500).json({ Status: "Failed to fetch contact" });
        }
    },

    // Update contact details
    updateContact: async (req, res) => {
        try {
            const contact = await Contact.findOne({
                where: { id: req.params.id },
            });
            if (!contact) {
                return res.status(404).json({ Status: "Contact not found" });
            }

            // Ensure the user owns the contact they're trying to modify
            const user = await User.findByPk(req.user.id);
            if (user.id!== contact.user_id) {
                return res.status(403).json({ Status: "Access denied" });
            }
            
            contact.first_name = req.body.first_name || contact.first_name;
            contact.last_name = req.body.last_name || contact.last_name;
            contact.cell_phone = req.body.cell_phone || contact.cell_phone;
            contact.work_phone = req.body.work_phone || contact.work_phone;
            contact.company_title = req.body.company_title || contact.company_title;
            contact.email = req.body.email || contact.email;
            contact.notes = req.body.notes || contact.notes;
            await contact.save();
            return res.json({
                Status: "Success",
                message: "Contact updated",
                contact,
            });
        } catch (error) {
            console.error("Error occurred during company update:", error);
            return res.status(500).json({ Status: "Failed to update company" });
        }
    },

    // Delete a contact by its ID
    deleteContact: async (req, res) => {
        try {
            const contact = await Contact.findOne({
                where: { id: req.params.id },
            });
            if (!contact) {
                return res.status(404).json({ Status: "Contact not found" });
            }
            const user = await User.findByPk(req.user.id);
            if (user.id!== contact.user_id) {
                return res.status(403).json({ Status: "Access denied" });
            }
            await contact.destroy();
            return res.json({ Status: "Success", message: "Contact deleted" });
        } catch (error) {
            console.error("Error occurred during company deletion:", error);
            return res.status(500).json({ Status: "Failed to delete company" });
        }
    },
};

export default contactController;