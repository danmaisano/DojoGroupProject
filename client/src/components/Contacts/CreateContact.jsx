import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const NewContactModal = (props) => {
    // Set incoming/outgoing props
    const { 
        user, 
        show, 
        handleClose, 
        afterSubmit, 
        setFormData, 
        opportunities,  // Pass opportunities as a prop
        setOpportunities,  // Pass setOpportunities as a prop
        opp, 
        contactId,
        selectedContact
    } = props;


    // Set Form Data state
    const [contactFormData, setContactFormData] = useState({
        first_name: '',
        last_name: '',
        cell_phone: '',
        work_phone: '',
        email: '',
        user_id: user.id,
        company_id: user.company,
        company_title: '',
        notes: '',
    });

    const handleSelectContact = (contactId) => {
        setFormData((prevData) => ({
            ...prevData,
            contact_id: contactId,
        }));
        // Close the contact creation modal
        handleClose();
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleContactSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/contacts/create', contactFormData, {
            withCredentials: true
        })
            .then(res => {
                console.log("Contact created: ", res.data.contact.id);
                
                if (afterSubmit) afterSubmit(res.data.contact.id);
                handleSelectContact(res.data.contact.id); // add the contact id to the form data
                const updatedOpportunities = [...opportunities];
                setOpportunities((updatedOpportunities) => {
                    handleClose(); // Close the modal after successful submission
                    // Update the opportunities
                    return updatedOpportunities;
            })
            .catch(err => console.log(err));
            console.log("handleSubmit.catch: ", contactFormData);
            })
    };


    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create a New Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleContactSubmit}>
                    {/* Form fields for creating a new contact */}
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            required
                            value={contactFormData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            required
                            value={contactFormData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cell Phone</label>
                        <input
                            type="text"
                            name="cell_phone"
                            className="form-control"
                            required
                            value={contactFormData.cell_phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Work Phone</label>
                        <input
                            type="text"
                            name="work_phone"
                            className="form-control"
                            required
                            value={contactFormData.work_phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            required
                            value={contactFormData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <input
                            type="text"
                            name="notes"
                            className="form-control"
                            value={contactFormData.notes}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Create Contact
                    </button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewContactModal;