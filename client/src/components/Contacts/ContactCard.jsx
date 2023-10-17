
import React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import email from './../../assets/icons/email.svg';
import phone from './../../assets/icons/phone.svg';
import cellphone from './../../assets/icons/cellphone.svg';
import edit from './../../assets/icons/edit.svg';
import axios from 'axios';


const ContactModal = ({ contact }) => {

    if (!contact) {
        return null;
    }
    console.log("contact: ", contact);

    const [editMode, setEditMode] = React.useState(false);
    const [contactEditMode, setContactEditMode] = React.useState(false);
    const [showContactModal, setShowContactModal] = React.useState(true);
    const [pendingOpps, setPendingOpps] = React.useState([]);
    const [wonOpps, setWonOpps] = React.useState([]);
    const [notes, setNotes] = React.useState(contact.notes);
    const [updatedContact, setUpdatedContact] = React.useState(contact);
    const [thisContact, setThisContact] = React.useState(contact);
    const [formData, setFormData] = React.useState({ ...contact });

    // Get and filter Opportunities associated with Contact
    const getContactOpportunities = async (contactId) => {
        try {
            const response = await axios.get(`http://localhost:8081/opportunities/contact/${contactId}`, {
                withCredentials: true
            });
            console.log(response.data);
            const contactOpps = response.data.opportunities;
            const pendingOpportunities = contactOpps.filter(opportunity => opportunity.status !== "won");
            const wonOpportunities = contactOpps.filter(opportunity => opportunity.status === "won");
            setPendingOpps(pendingOpportunities);
            setWonOpps(wonOpportunities);
            console.log("Pending: ", pendingOpportunities);
            console.log("Won: ", wonOpportunities);
        } catch (error) {
            console.error(error);
        }
    };

    //Get contact by id
    const getContactById = async (contactId) => {
        try {
            const response = await axios.get(`http://localhost:8081/contacts/${contactId}`, {
                withCredentials: true
            });
            console.log(response.data);
            const contact = response.data;
            setNotes(contact.notes);
        } catch (error) {
            console.error(error);
        }
    };

    // Call the above function when the component mounts.
    useEffect(() => {
        if (contact) {
            getContactOpportunities(contact.id);
            setUpdatedContact(getContactById(contact.id));
        }
    }, [contact]);

    // Close Modal
    const closeModal = () => {
        setShowContactModal(false);
        window.location.reload();
    };

    // Open default email client and prefil address
    const sendEmail = () => {
        window.location.href = 'mailto:johndoe@companyname.com';
    };

    // Edit Contact Info
    const handleContactEditMode = () => {
        setUpdatedContact(thisContact);
        setContactEditMode(true);
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);  // call validateField when the input changes
    };

    const saveContact = () => {
        axios
            .put(`http://localhost:8081/contacts/${contact.id}`, formData, {
                withCredentials: true
            })
            .then((response) => {
                console.log("Contact updated successfully: ", response.data);
                setThisContact(formData);
                setContactEditMode(false);
            })
            .catch((error) => {
                console.error("Error updating contact:", error);
            });
    };

    // Edit notes
    const handleEditMode = () => {
        setEditMode(true);
        setNotes(contact.notes);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    // Validation for contact form
    const [validation, setValidation] = useState({
        first_name: null,
        last_name: null,
        cell_phone: null,
        work_phone: null,
        email: null,
    });

    const validateField = (name, value) => {
        let valid = null;
        if (value === '') {
            valid = false;
        } else {
            valid = true;
        }

        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            valid = emailPattern.test(value);
        }
        if (name === 'cell_phone' || name === 'work_phone') {
            const phonePattern = /^\d{10}$/;
            valid = phonePattern.test(value);
        }

        setValidation(prevState => ({
            ...prevState,
            [name]: valid
        }));
    };


    const handleSaveNotes = () => {
        // Save the updated notes to the DB
        axios
            .put(`http://localhost:8081/contacts/${contact.id}`, { notes }, {
                withCredentials: true
            })
            .then((response) => {
                console.log('Notes updated successfully:', response.data);
                const updatedContact = { ...contact, notes: notes };
                // Store updated contact in state
                setThisContact(updatedContact);
                setEditMode(false);
            })
            .catch((error) => {
                console.error('Error updating notes:', error);
            });
    };

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    };

    return (
        <div className='m-5'>
            <Modal show={showContactModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    Contact Details:
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            {contactEditMode ? (
                                <>
                                    <div className='d-flex m-1'>
                                        <label className='col' htmlFor="first_name">First Name:</label>
                                        <input
                                            className='col'
                                            type="text"
                                            id='first_name'
                                            name='first_name'
                                            value={formData.first_name}
                                            onChange={handleContactChange}
                                        />
                                    </div>
                                    <div className='d-flex m-1'>
                                        <label className='col' htmlFor="last_name">Last Name:</label>
                                        <input
                                            className='col'
                                            type="text"
                                            id='last_name'
                                            name='last_name'
                                            value={formData.last_name}
                                            onChange={handleContactChange}
                                        />
                                    </div>
                                    <div className='d-flex m-1'>
                                        <label className='col' htmlFor="cell_phone">Cell#:</label>
                                        <input
                                            className={`col ${validation.cell_phone === false ? 'is-invalid' : ''}`}
                                            type="text"
                                            id='cell_phone'
                                            name='cell_phone'
                                            value={formData.cell_phone}
                                            onChange={handleContactChange}
                                        />
                                        {validation.cell_phone === false && <div className="invalid-feedback">Please enter a 10-digit phone number.</div>}
                                    </div>
                                    <div className='d-flex m-1'>
                                        <label className='col' htmlFor="work_phone">Work#:</label>
                                        <input
                                            className={`col ${validation.work_phone === false ? 'is-invalid' : ''}`}
                                            type="text"
                                            id='work_phone'
                                            name='work_phone'
                                            value={formData.work_phone}
                                            onChange={handleContactChange}
                                        />
                                        {validation.work_phone === false && <div className="invalid-feedback">Please enter a 10-digit phone number.</div>}
                                    </div>
                                    <div className='d-flex m-1'>
                                        <label className='col' htmlFor="email">Email:</label>
                                        <input
                                            className={`col ${validation.email === false ? 'is-invalid' : ''}`}
                                            type="text"
                                            id='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleContactChange}
                                        />
                                        {validation.email === false && <div className="invalid-feedback">Please enter a valid email address.</div>}
                                    </div>
                                    <div className='d-flex justify-content-center p-1'>
                                        <button className="btn btn-primary" onClick={saveContact}>Save</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='d-flex justify-content-between'>
                                        <h3>{`${thisContact.first_name} ${thisContact.last_name}`}</h3>
                                        <img src={edit} className='m-1' onClick={() => setContactEditMode(true)} />
                                    </div>
                                    <p className='mb-0'><img src={cellphone} className='m-1' /> <a href='#'>{formatPhoneNumber(thisContact.cell_phone)}</a></p>
                                    <p><img src={phone} className='m-1' /> <a href='#'>{formatPhoneNumber(thisContact.work_phone)}</a></p>
                                    <p><img src={email} className='m-1' /><a href={`mailto:${thisContact.email}`}>{thisContact.email}</a></p>
                                </>
                            )}
                        </div>
                        <div className='m-auto w-50'>
                            <div className='d-flex flex-column m-auto w-75'>
                                <div className='d-flex flex-column p-2 border-bottom border-light'>
                                    <div className='justify-content-between d-flex flex-column'>
                                        <h5>Pending:</h5>
                                        {pendingOpps.length === 0 ? (
                                            <p>No pending opportunities found</p>
                                        ) : (
                                            pendingOpps.map((opportunity) => (
                                                <div className='d-flex flex-column' key={opportunity.id}>
                                                    <a href="#">{opportunity.opportunity_name}</a>
                                                </div>
                                            )))
                                        }
                                    </div>
                                </div>
                                <div className='d-flex flex-column m-autow-75'>
                                    <div className='d-flex flex-column p-2'>
                                        <div className='justify-content-between d-flex flex-column'>
                                            <h5>Secured:</h5>
                                            {wonOpps.length === 0 ? (
                                                <p>No Business History</p>
                                            ) : (
                                                wonOpps.map((opportunity) => (
                                                    <div className='d-flex flex-column' key={opportunity.id}>
                                                        <a href="#">{opportunity.opportunity_name}</a>
                                                    </div>
                                                )))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between w-100 border-bottom mb-2 pb-2 border-light'>
                            <h5>Notes:</h5>
                            <img src={edit} className='m-1' onClick={handleEditMode} />
                        </div>
                        {editMode ? (
                            <>
                                <div className='d-flex justify-content-between'>
                                    <input
                                    
                                        className='col-md-10'
                                        type="text"
                                        value={notes}
                                        onChange={handleNotesChange}
                                    />
                                    <button className="btn btn-primary" onClick={handleSaveNotes}>Save</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className='p-2'>
                                    {thisContact.notes}
                                </p>
                            </>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default ContactModal;