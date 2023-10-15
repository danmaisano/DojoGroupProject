
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import email from './../../assets/icons/email.svg';
import phone from './../../assets/icons/phone.svg';
import cellphone from './../../assets/icons/cellphone.svg';
import edit from './../../assets/icons/edit.svg';


const ContactModal = ({ contact }) => {

    if (!contact) {
        return null;
    }
    console.log("contact: ", contact);

    const [editMode, setEditMode] = React.useState(false);
    const [won, setWon] = React.useState({});
    const [pendingOpps, setPendingOpps] = React.useState({});
    const [showContactModal, setShowContactModal] = React.useState(true);

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

    // Get opportunities by status=Won
    const getWonOpportunities = async () => {
        const response = await Contact.find({
            status: 'Won'
        });
        setWon(response);
    };

    // Get opportunites != status Won
    const getPendingOpportunities = async () => {
        const response = await Contact.find({
            status: 'Won'
        });
        setPendingOpps(response);
    };

    // Close Modal
    const handleClose = () => {
        setShowContactModal(false);
    };

    // Open default email client and prefil address
    // TODO: Grab email from DB to populate function ----- <= TODO
    const sendEmail = () => {
        window.location.href = 'mailto:johndoe@companyname.com';
    };

    return (
        <div className='m-5'>
            <Modal show={showContactModal} onHide={handleClose}>
                {/* TODO: Populate information with DB query ----- <= TODO  */}
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Title>Contact Details</Modal.Title>
                <Modal.Body className='p-4'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h3>{`${contact.first_name} ${contact.last_name}`}</h3>
                            <p className='mb-0'><img src={cellphone} className='m-1' /> <a href='#'>{contact.cell_phone}</a></p>
                            <p><img src={phone} className='m-1' /> <a href='#'>{contact.work_phone}</a></p>
                            <p><img src={email} className='m-1' /><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                        </div>
                        <div className='m-auto w-50'>
                            <div className='d-flex flex-column m-auto w-75'>
                                <div className='d-flex flex-column p-2 border-bottom border-light'>
                                    <div className='justify-content-between d-flex'>
                                        {/* Loop through 3 most recent bids pending.  ----- <= TODO */}
                                        {/* "More" will lead to filtered list */}
                                        <h5>Pending:</h5>
                                        <a href='#'>More</a>
                                    </div>
                                    <a href='#'>Bid loop link.</a>
                                    <a href='#'>Bid loop link.</a>
                                    <a href='#'>Bid loop link.</a>
                                </div>
                                <div className='d-flex flex-column p-2'>
                                    <div className='d-flex justify-content-between'>
                                        {/* Loop through 3 most recent bids won.   ----- <= TODO */}
                                        {/* "More" will lead to filtered list */}
                                        <h5>Secured:</h5>
                                        <a href='#'>More</a>
                                    </div>
                                    <a href='#'>Secured loop link.</a>
                                    <a href='#'>Secured loop link.</a>
                                    <a href='#'>Secured loop link.</a>
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
        </div>
    );
};

export default ContactModal;