import React, { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = ({ children, user, setUser }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    const closeNav = () => {
        setIsExpanded(false);
    };

    const handleLogout = () => {
        axios
        .get("http://localhost:8081/users/logout")
        .then((res) => {
            Cookies.remove("token");
            Cookies.remove("userData");
            closeNav();
            navigate("/");
            window.location.reload();
        })
        .catch((err) => console.log(err));
    };

    return (
        <>
        {user && Object.keys(user).length > 0 && (
            <>
                <Navbar variant="dark" expand={false} expanded={isExpanded}>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setIsExpanded(!isExpanded)} />
                </Navbar>
                <Offcanvas show={isExpanded} onHide={() => setIsExpanded(false)} placement="start" id="offcanvasNavbar">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Kizer</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            <LinkContainer to="/dashboard">
                                <Nav.Link onClick={closeNav}>Dashboard</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/company/${user.company}`}>
                                <Nav.Link onClick={closeNav}>View Company Page</Nav.Link>
                            </LinkContainer>
                            <Button className="btn btn-danger mt-2" onClick={handleLogout}>Logout</Button>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )}
        <div className="content">
            {children}
        </div>
        <footer className="text-white mt-5 p-4 text-center">
        Copyright © 2023 Kizer
        </footer>
        </>
    );
};

export default Layout;



