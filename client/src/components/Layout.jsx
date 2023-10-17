import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, Dropdown, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Building, List, PersonFill, PersonRolodex, PlusCircle, Search, Speedometer } from 'react-bootstrap-icons';
import './Layout.css';

const Layout = ({ children, user, setUser }) => {
    const navigate = useNavigate();

    // Define the breakpoint for md (Bootstrap's default is 768px)
    const MD_BREAKPOINT = 768;
    
    // Initialize state based on window's width
    const [showSidebar, setShowSidebar] = useState(window.innerWidth > MD_BREAKPOINT);

    useEffect(() => {
        // Function to toggle sidebar based on window width
        const handleResize = () => {
            setShowSidebar(window.innerWidth > MD_BREAKPOINT);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup: remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        axios
        .get("http://localhost:8081/users/logout")
        .then((res) => {
            Cookies.remove("token");
            Cookies.remove("userData");
            navigate("/");
            window.location.reload();
        })
        .catch((err) => console.log(err));
    };
    console.log("Company ID:", user.company);
    return (
        <>
        {user && Object.keys(user).length > 0 && (
            <>
                <Navbar bg="dark" variant="dark" expand="md" sticky='top' className="border-bottom border-light d-flex justify-content-between">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowSidebar(!showSidebar)}>
                            <List />
                        </Navbar.Toggle>
                        <Navbar.Brand href="#" className="mx-auto">Dojo CRM</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Dropdown className='Dropdown'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <PersonFill />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="text-right" style={{ right: 0, left: 'auto' }}>
                                        <Dropdown.Item href="/profile">Settings</Dropdown.Item>
                                        <Dropdown.Item href="/activity">Activity Log</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#!" onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container fluid>
                    <Row className='flex-grow-1'>
                        {showSidebar && (
                            <Col className="d-flex  border-end border-3 position-sticky top-0 vh-100" >
                                <div className="">
                                    <Nav className="flex-column fixed-sidebar" >
                                        <LinkContainer to="/dashboard">
                                            <Nav.Link className=" align-items-center border-bottom border-secondary p-3">
                                                <Speedometer className="nav-icon" /> 
                                                Dashboard
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to={`/company/${user.company}`}>
                                            <Nav.Link className=" align-items-center border-bottom  border-secondary p-3">
                                                <Building className="nav-icon" /> 
                                                Company Info
                                            </Nav.Link>
                                        </LinkContainer>
                                        
                                        <LinkContainer to="/newOpp">
                                            <Nav.Link className=" align-items-center border-bottom  border-secondary p-3">
                                                <PlusCircle className="nav-icon" />
                                                Create New Opportunity
                                            </Nav.Link>
                                        </LinkContainer>
                                        
                                        <LinkContainer to="/test">
                                            <Nav.Link className=" align-items-center border-secondary p-3">
                                                <PersonRolodex className="nav-icon" />
                                                Add New Contact
                                            </Nav.Link>
                                        </LinkContainer>
                                        {/* ... other links ... */}
                                    </Nav>
                                </div>
                            </Col>
                        )}
                        <Col md={showSidebar ? 9 : 12} lg={showSidebar ? 10 : 12} className='bg-secondary'>
                            <Row>   
                                <Col>
                                    <main className="mt-4">
                                        <Outlet />
                                    </main>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </>
        )}
        <footer className="footer mt-auto py-3 bg-dark vh-10 border-top border-light w-100">
            <div className="container">
                <span className="text-muted">Copyright &copy; Dojo CRM 2023</span>
            </div>
        </footer>
        </>
    );
};

export default Layout;








