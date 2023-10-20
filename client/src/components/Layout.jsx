import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, Dropdown, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Building, List, PersonFill, PersonRolodex, PlusCircle, Search, Speedometer } from 'react-bootstrap-icons';
import './Layout.css';

const Layout = ({ children, user, setUser }) => {
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('Dashboard');

    // Define a function to check if a path is active
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };
    // Define a function to get the class name for a link based on whether it is active or not
    const getLinkClass = (path) => {
        return isActive(path) ? 'active-link' : 'disabled-link';
    };

    // Define the breakpoint for md (Bootstrap's default is 768px)
    const MD_BREAKPOINT = 768;
    
    // Initialize state based on window's width
    const [showSidebar, setShowSidebar] = useState(window.innerWidth > MD_BREAKPOINT);

    useEffect(() => {
            // Update the page title based on the current path
        const currentPath = location.pathname;
        if (currentPath.includes('dashboard')) {
            setPageTitle('Dashboard');
        } else if (currentPath.includes('company')) {
            setPageTitle('Company Info');
        } else if (currentPath.includes('newOpp')) {
            setPageTitle('New Opportunity');  // Set title for Create New Opportunity page
        } else if (currentPath.includes('contacts')) {
            setPageTitle('Contacts');
        } else if (currentPath.includes('profile')) {
            setPageTitle('Profile');
        } else if (currentPath.includes('activity')) {
            setPageTitle('Activity Log');
        } else if (currentPath.includes('view-opportunity')) {
            setPageTitle('Opportunity Details');
        }
        
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
    }, [location.pathname]);

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
    return (
        <>
        {user && Object.keys(user).length > 0 && (
            <>
                <Navbar bg="dark" variant="dark" expand="md" sticky='top' className="border-bottom border-light d-flex justify-content-between">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowSidebar(!showSidebar)}>
                            <List />
                        </Navbar.Toggle>
                        <Navbar.Brand href="#" className="mx-auto">{pageTitle}</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Dropdown className='Dropdown'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <PersonFill className="nav-icon" />
                                        <span className='pe-3'>{user.first_name} {user.last_name}</span>
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
                                            <Nav.Link className={`align-items-center border-bottom border-secondary p-3 ${getLinkClass('/dashboard')}`} 
                                                disabled={isActive('/dashboard')}>
                                                <div className="d-flex align-items-center">
                                                    <Speedometer className="nav-icon" /> 
                                                    <span>Dashboard</span>
                                                </div>
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to={`/company/${user.company}`}>
                                            <Nav.Link className={` align-items-center border-bottom  border-secondary p-3 ${getLinkClass('/company')}`}
                                                disabled={isActive('/company/')}>
                                                <div className="d-flex align-items-center">
                                                    <Building className="nav-icon" /> 
                                                    <span>Company Info</span>
                                                </div>
                                            </Nav.Link>
                                        </LinkContainer>
                                        
                                        <LinkContainer to="/newOpp">
                                            <Nav.Link className={` align-items-center border-bottom  border-secondary p-3 ${getLinkClass('/newOpp')}`}
                                                disabled={isActive('/newOpp')}>
                                                <div className="d-flex align-items-center">
                                                    <PlusCircle className="nav-icon" />
                                                    <span>Create New Opportunity</span>
                                                </div>
                                            </Nav.Link>
                                        </LinkContainer>
                                        
                                        <LinkContainer to="/contacts">
                                            <Nav.Link className={` align-items-center border-bottom  border-secondary p-3 ${getLinkClass('/contacts')}`}
                                                disabled={isActive('/contacts')}>
                                                <div className="d-flex align-items-center">
                                                    <PersonRolodex className="nav-icon" />
                                                    <span>Contacts</span>
                                                </div>
                                            </Nav.Link>
                                        </LinkContainer>
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








