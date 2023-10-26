import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const NewUserModal = (props) => {
  const { setUser, company, handleClose, fetchUsers  } = props;
  const company_name = company.company_name;
  const company_id = company.id;
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company_name: company_name, 
    password: '1234',
    confirm_password: '1234',
    role: '',
});
  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    company: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: !value }));
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    
    const newErrors = {};
  
    if (!formData.first_name) {
      newErrors.first_name = "First name is required.";
    }
    
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required.";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }
    
    if (!company || !company.company_name) {
      newErrors.company = "Company name is required.";
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("errors", newErrors);
      return;
    }
  
    formData.company_id = company.id;
    
    axios.post('http://localhost:8081/users/createUser', formData, {withCredentials: true})
    .then(res => {
      handleClose();
      fetchUsers();
    })
    .catch(err => console.log(err));
  

  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleNewUser}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Floating className="mb-3 mb-md-0">
                <Form.Control
                  id="inputFirstName"
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  isInvalid={errors.first_name}
                />
                <Form.Label htmlFor="inputFirstName">First name</Form.Label>
                <Form.Control.Feedback type="invalid">First name is required</Form.Control.Feedback>
              </Form.Floating>
            </Col>
            <Col md={6}>
              <Form.Floating>
                <Form.Control
                  id="inputLastName"
                  type="text"
                  placeholder="Enter your last name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  isInvalid={errors.last_name}
                />
                <Form.Label htmlFor="inputLastName">Last name</Form.Label>
                <Form.Control.Feedback type="invalid">Last name is required</Form.Control.Feedback>
              </Form.Floating>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Floating className="mb-3 mb-md-0">
                <Form.Control
                  id="inputEmail"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={errors.email}
                />
                <Form.Label htmlFor="inputFirstName">Email</Form.Label>
                <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="inputRole">Role</Form.Label>
                  <Form.Select name="role" onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Form.Group>
              </Form.Floating>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" type="button" onClick={handleNewUser}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
