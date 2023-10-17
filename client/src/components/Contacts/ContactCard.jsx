
import React from 'react';
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
    const [showContactModal, setShowContactModal] = React.useState(true);
    const [pendingOpps, setPendingOpps] = React.useState([]);
    const [wonOpps, setWonOpps] = React.useState([])
    // const [contactDetails, setContactDetails] = React.useState(null);

    // useEffect(() => {
    //     if (contact) {
    //         // Fetch contact details by ID from the server
    //         axios.get(`http://localhost:8081/opportunities/contact/${contact.id}`, {
    //             withCredentials: true
    //         })
    //             .then((response) => {
    //                 setContactDetails(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }
    // }, [contact]);

    // if (!contactDetails) {
    //     return null; // Render loading or handle error
    // }

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

    useEffect(() => {
        if (contact) {
            getContactOpportunities(contact.id);
        }
    }, [contact]);

    // const getWonOpportunities = async (contactId) => {
    //     const response = await axios.get(`http://your-api-url/opportunities?contact_id=${contactId}&status=Won`);
    //     setWonOpps(response.data);
    // }

    // Get Contact by Id
    const getContact = async (id) => {
        const response = await contact.findById(id);
        setContact(response);
    };

    // Update Contact
    const updateContact = async () => {
        const response = await contact.findByIdAndUpdate(
            contact.id,
            contact,
            { new: true }
        );
        setContact(response);
        setEditMode(false);
    };

    // Close Modal
    const handleClose = () => {
        setShowContactModal(false);
    };

    // Open default email client and prefil address
    const sendEmail = () => {
        window.location.href = 'mailto:johndoe@companyname.com';
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
            <Modal show={showContactModal} onHide={handleClose}>
                {/* TODO: Populate information with DB query ----- <= TODO  */}
                <Modal.Header closeButton>
                    Contact Details:
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h3>{`${contact.first_name} ${contact.last_name}`}</h3>
                            <p className='mb-0'><img src={cellphone} className='m-1' /> <a href='#'>{formatPhoneNumber(contact.cell_phone)}</a></p>
                            <p><img src={phone} className='m-1' /> <a href='#'>{formatPhoneNumber(contact.work_phone)}</a></p>
                            <p><img src={email} className='m-1' /><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
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
                                    {/* </div> */}
                                </div>
                                <div className='d-flex flex-column m-autow-75'>
                                    <div className='d-flex flex-column p-2'>
                                        <div className='justify-content-between d-flex flex-column'>
                                            <h5>Secured:</h5>
                                            {/* <a href='#'>More</a> */}
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
                        {/* TODO: Creat onClick for Edit icon that replaces <p>    ----- <= TODO*/}
                        {/* with text area followed by a PUT/PATCH */}
                        <div className='d-flex justify-content-between w-100'>
                            <h5>Notes:</h5>
                            <img src={edit} className='m-1' />
                        </div>
                        <p className='border-top mt-2 border-light p-2'>
                            {contact.notes}
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default ContactModal;