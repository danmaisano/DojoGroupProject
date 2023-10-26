import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ContactModal from './ContactCard';

// const GridRowsProp = [
//     { id: 1, col1: "Hello", col2: "World" },
//     { id: 2, col1: "DataGrid", col2: "Testing" },
//     { id: 3, col1: "First", col2: "Attempt" }
// ];

// const GridColDefs = [
//     { field: 'col1', headerName: 'Column 1', width: 200 },
//     { field: 'col2', headerName: 'Column 2', width: 100 }
// ];


const TestTable = (props) => {
    const { user, setUser } = props;
    const [userContacts, setUserContacts] = useState([]);
    const [companyContacts, setCompanyContacts] = useState([]);
    const token = Cookies.get("token");
    const [tabValue, setTabValue] = useState(0);

    // Define columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'first_name', headerName: 'First Name', flex: 1 },
        { field: 'last_name', headerName: 'Last Name', flex: 1 },
        { field: 'cell_phone', headerName: 'Cell Phone', width: 150 },
        { field: 'work_phone', headerName: 'Work Phone', width: 150 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'notes', headerName: 'Notes', flex: 1 },
    ];

    useEffect(() => {
        // Check if user
        if (user.id && user.company) {

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
                };
            };

            // Get contacts
            getUserContacts(user.id);
            getCompanyContacts(user.company);
        }
    }, [user]);

    // Open the contact modal
    const openContactModal = (selectedContact) => {
        // Implement the logic for opening the modal here
    };

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    return (
        <Container className='card pt-3 pb-3'>
            <h1>Contacts</h1>
            <hr />
            <div className="table-responsive">
                <Tabs
                    className="border-bottom"
                    onChange={handleTabChange}
                    value={0} // Set the active tab index
                >
                    <Tab label="My Contacts" value={0} />
                    <Tab label="Company Contacts" value={1} />
                </Tabs>
                {tabValue === 0 && (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={userContacts.contacts || []}
                            columns={columns}
                        />
                    </div>
                )}
                {tabValue === 1 && (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={companyContacts.contacts || []}
                            columns={columns}
                        />
                    </div>
                )}
            </div>
            <div className='d-flex justify-content-left'>
                <Button variant="contained" color="primary" className='btn btn-small btn-success m-1' href='/newContact'>
                    Add A New Contact
                </Button>
            </div>
        </Container>
    );
}

export default TestTable;