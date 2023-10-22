import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Building,
  List,
  PersonFill,
  PersonRolodex,
  PlusCircle,
  Speedometer,
} from "react-bootstrap-icons";

const Layout = ({ children, user, setUser }) => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("Dashboard");

  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path) => {
    return isActive(path) ? "active-link" : "disabled-link";
  };

  const MD_BREAKPOINT = 768;
  const [showSidebar, setShowSidebar] = useState(
    window.innerWidth > MD_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > MD_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        sticky="top"
        className="border-bottom border-light d-flex justify-content-between"
      >
        <Container fluid>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <List />
          </Navbar.Toggle>
          <Navbar.Brand 
            onClick={() => navigate(user.role === "superAdmin" ? "/superAdminDashboard" : "/dashboard")} 
            className="mx-auto" 
            style={{ cursor: 'pointer' }}
            >
            <h2>{user.role === "superAdmin" ? "Super Admin Dashboard" : "Dashboard"}</h2>
            </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Dropdown className="Dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <PersonFill className="nav-icon" />
                  <span className="pe-3">
                    {user.first_name} {user.last_name}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="text-right"
                  style={{ right: 0, left: "auto" }}
                >
                  <Dropdown.Item href="/profile">Settings</Dropdown.Item>
                  <Dropdown.Item href="/activity">Activity Log</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#!" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row className="flex-grow-1">
          {showSidebar && (
            <Col className="d-flex  border-end border-3 position-sticky top-0 vh-100">
              <div className="">
                <Nav className="flex-column fixed-sidebar">
                  {user.role === "superAdmin" ? (
                    <LinkContainer to="/superAdminDashboard">
                      <Nav.Link
                        className={`align-items-center border-bottom border-secondary p-3 ${getLinkClass(
                          "/superAdminDashboard"
                        )}`}
                        disabled={isActive("/superAdminDashboard")}
                      >
                        <div className="d-flex align-items-center">
                          <Speedometer className="nav-icon mx-2" />
                          <span>Super Admin Dashboard</span>
                        </div>
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <>
                      <LinkContainer to="/dashboard">
                        <Nav.Link
                          className={`align-items-center border-bottom border-secondary p-3 ${getLinkClass(
                            "/dashboard"
                          )}`}
                          disabled={isActive("/dashboard")}
                        >
                          <div className="d-flex align-items-center">
                            <Speedometer className="nav-icon mx-2" />
                            <span>Dashboard</span>
                          </div>
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to={`/company/${user.company}`}>
                        <Nav.Link
                          className={` align-items-center border-bottom  border-secondary p-3 ${getLinkClass(
                            "/company"
                          )}`}
                          disabled={isActive("/company/")}
                        >
                          <div className="d-flex align-items-center">
                            <Building className="nav-icon mx-2" />
                            <span>Company Info</span>
                          </div>
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to="/newOpp">
                        <Nav.Link
                          className={` align-items-center border-bottom  border-secondary p-3 ${getLinkClass(
                            "/newOpp"
                          )}`}
                          disabled={isActive("/newOpp")}
                        >
                          <div className="d-flex align-items-center">
                            <PlusCircle className="nav-icon mx-2" />
                            <span>Create Opportunity</span>
                          </div>
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to="/contacts">
                        <Nav.Link
                          className={` align-items-center border-bottom  border-secondary p-3 ${getLinkClass(
                            "/contacts"
                          )}`}
                          disabled={isActive("/contacts")}
                        >
                          <div className="d-flex align-items-center">
                            <PersonRolodex className="nav-icon mx-2" />
                            <span>Contacts</span>
                          </div>
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                </Nav>
              </div>
            </Col>
          )}
          <Col
            md={showSidebar ? 9 : 12}
            lg={showSidebar ? 10 : 12}
            className="bg-secondary"
          >
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
      <footer className="footer mt-auto py-3 bg-dark vh-10 border-top border-light w-100">
        <div className="container">
          <span className="text-muted">Copyright &copy; Dojo CRM 2023</span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
