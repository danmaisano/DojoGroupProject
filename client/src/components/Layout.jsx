import React, { useState } from 'react';
import { Navbar, Nav, Button, Form, FormControl, Dropdown, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Building, List, PersonFill, PersonRolodex, PlusCircle, Search, Speedometer } from 'react-bootstrap-icons';
import './Layout.css';

const Layout = ({ children, user, setUser }) => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(true);

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
                <Navbar bg="dark" variant="dark" expand="md" sticky='top'>
                    <Container fluid>
                        <div className='d-flex'>    
                            <Navbar.Brand href="/">Dojo CRM</Navbar.Brand>
                            <Button 
                                variant="outline-success"
                                onClick={() => setShowSidebar(!showSidebar)}
                            >
                                <List />
                            </Button>
                        </div>    
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form className="d-flex ms-auto">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">
                                    <Search />
                                </Button>
                            </Form>
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
                    <Row>
                        {showSidebar && (
                            <Col className="d-md-block bg-dark sidebar p-3 d-none">
                                <Nav className="flex-column  ">
                                    <LinkContainer to="/dashboard">
                                        <Nav.Link className=" align-items-center ">
                                            <Speedometer className="nav-icon" /> 
                                            Dashboard
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to={`/company/${user.company}`}>
                                        <Nav.Link className=" align-items-center ">
                                            <Building className="nav-icon" /> 
                                            Company Info
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/newOpp">
                                        <Nav.Link className=" align-items-center ">
                                            <PlusCircle className="nav-icon" />
                                            Create New Opportunity
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/test">
                                        <Nav.Link className=" align-items-center ">
                                            <PersonRolodex className="nav-icon" />
                                            Add New Contact
                                        </Nav.Link>
                                    </LinkContainer>
                                    <Button variant="danger" onClick={handleLogout} >Logout </Button>
                                    {/* ... other links ... */}
                                </Nav>
                            </Col>
                        )}
                        <Col md={showSidebar ? 9 : 12} lg={showSidebar ? 10 : 12}>
                            <main className="mt-4">
                                <Outlet />
                            </main>
                        </Col>
                    </Row>
                </Container>
            </>
        )}
        <footer className="footer mt-auto py-3 bg-dark vh-10">
            <div className="container">
                <span className="text-muted">Copyright &copy; Dojo CRM 2023</span>
            </div>
        </footer>
        </>
    );
};

export default Layout;








