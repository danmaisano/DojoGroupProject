import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from 'react-bootstrap';
import ContactModal from './ContactCard';



function ContactsList(props) {
    const { user, setUser } = props;
    const [userContacts, setUserContacts] = useState([]);
    const [companyContacts, setCompanyContacts] = useState([]);
    const token = Cookies.get("token");

    const userId = user.id;
    const companyId = user.company;
    console.log(userId, companyId);

    // Get User Contacts
    const getUserContacts = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8081/contacts/user/own/${userId}`, {
                withCredentials: true
            });
            setUserContacts(response.data);
            console.log("User Contacts: ", response.data);
        } catch (error) {
            console.error('Error getting user contacts');
        }
    };

    // Get Company Contacts
    const getCompanyContacts = async (companyId) => {
        try {
            const response = await axios.get(`http://localhost:8081/contacts/company/${companyId}`, {
                withCredentials: true
            });
            setCompanyContacts(response.data);
            console.log("Company Contacts: ", response.data);
        } catch (error) {
            console.error('Error getting company contacts');
        }
    };

    useEffect(() => {
        console.log("User ID: ", userId);
        console.log("Company ID: ", companyId);
        // Check if user
        if (user) {
            // Get contacts
            getUserContacts(userId);
            getCompanyContacts(companyId);
        } else {
            // Navigate to login page with react-router-dom
            navigate('/login');
        }
    }, [user]);

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    };

    // Open default email client and prefil address
    const sendEmail = () => {
        window.location.href = 'mailto:johndoe@companyname.com';
    };

    // State for the contact modal
    const [showContactModal, setShowContactModal] = useState(false);
    // const [selectedContact, setSelectedContact] = useState(null);
    const [contactModals, setContactModals] = useState([]);
    const contactModalsRefs = {};

    // Open the contact modal
    const openContactModal = (selectedContact) => {
        const modalId = Date.now(); // Generate a unique ID for the modal
        const contactModal = (
            <ContactModal
                key={modalId}
                contact={selectedContact}
                handleClose={() => closeContactModal(modalId, closeContactModal)}
            />
        );
        setShowContactModal(true);
        setContactModals((modals) => [...modals, contactModal]);
        contactModalsRefs[modalId] = contactModal;
    };

    // Close the contact modal
    const closeContactModal = (modalId) => {
        setContactModals((modals) => modals.filter((modal) => modal.key !== modalId));
        setShowContactModal(false);
        window.location.reload();
    };

    return (
        <Container className='border rounded p-0 border-dark shadow'>
            <Tabs
                className="border-bottom"
                defaultActiveKey="My Contacts"
            >
                <Tab
                    title="My Contacts"
                    eventKey="My Contacts"
                >
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Cell</th>
                                <th className="text-center">Work</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userContacts.contacts && userContacts.contacts.length > 0 ? (
                                userContacts.contacts.map((contact, index) => (
                                    <tr key={contact.id}>
                                        <td className='p-2'>
                                            <a href="#" disabled={showContactModal} onClick={() => openContactModal(contact)} className="text-center">
                                                {contact.first_name} {contact.last_name}
                                            </a>
                                        </td>
                                        <td className="text-center p-2">{formatPhoneNumber(contact.cell_phone)}</td>
                                        <td className="text-center p-2">{formatPhoneNumber(contact.work_phone)}</td>
                                        <td className="text-center p-2"><a href="#" onClick={sendEmail}>{contact.email}</a></td>
                                        <td className='p-2'>{contact.notes}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No Contacts</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Tab>
                <Tab
                    title="Company Contacts"
                    eventKey="Company Contacts"
                >
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Cell</th>
                                <th className="text-center">Work</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyContacts.contacts && companyContacts.contacts.length > 0 ? (
                                companyContacts.contacts.map((contact, index) => (
                                    <tr key={contact.id}>
                                        <td className='p-2'>
                                            <a href="#" disabled={showContactModal} onClick={() => openContactModal(contact)} className="text-center">
                                                {contact.first_name} {contact.last_name}
                                            </a>
                                        </td>
                                        <td className="text-center p-2">{formatPhoneNumber(contact.cell_phone)}</td>
                                        <td className="text-center p-2">{formatPhoneNumber(contact.work_phone)}</td>
                                        <td className="text-center p-2"><a href="#" onClick={sendEmail}>{contact.email}</a></td>
                                        <td className='p-2'>{contact.notes}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No Contacts</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
            {contactModals}
        </Container>
    )
}

export default ContactsList;