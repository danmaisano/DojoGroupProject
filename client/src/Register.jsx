import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginUser from './components/loginUser';

const Register = (props) => {
    const { user, setUser } = props;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

            // Clear the error for the specific input field
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: !value
        }));
    };

    const [errors, setErrors] = useState({
        first_name: false,
        last_name: false,
        email: false,
        company: false,
        password: false,
        confirm_password: false,
    });

    const handleRegister = (e) => {
        e.preventDefault();
        const newErrors = {
            first_name: !formData.first_name,
            last_name: !formData.last_name,
            email: !formData.email,
            company: !formData.company,
            password: !formData.password,
            confirm_password: !formData.confirm_password,
        };
        setErrors(newErrors);
        if (errors) {
            return !Object.values(newErrors).some(error => error);
            }
        
        axios.post('http://localhost:8081/users/register', formData)
            .then(res => {
                console.log(res);
                console.log("Registration successful");
                loginUser(formData.email, formData.password, setUser, navigate);
            })
            .catch(err => console.log(err));
    };

    return (
        <Container fluid style={{ minHeight: '100vh', background: "#242424" }}>
            <Row className="justify-content-center">
                <Col lg={7}>
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h3 className="text-center font-weight-light my-4">Create Account</h3>
                        </div>
                        <div className="card-body">
                            <Form onSubmit={handleRegister}>
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
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                                id="inputEmail"
                                                type="email"
                                                placeholder="name@example.com"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                isInvalid={errors.email}
                                            />
                                            <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                                            <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                                        </Form.Floating>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                                id="inputCompany"
                                                type="text"
                                                placeholder="Enter your company name"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                isInvalid={errors.company}
                                            />
                                            <Form.Label htmlFor="inputCompany">Company Name</Form.Label>
                                            <Form.Control.Feedback type="invalid">Company name is required</Form.Control.Feedback>
                                        </Form.Floating>
                                    </Col>
                                </Row> 
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Floating className="mb-3 mb-md-0">
                                            <Form.Control
                                                id="inputPassword"
                                                type="password"
                                                placeholder="Create a password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                isInvalid={errors.password}
                                            />
                                            <Form.Label htmlFor="inputPassword">Password</Form.Label>
                                            <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                                        </Form.Floating>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Floating className="mb-3 mb-md-0">
                                            <Form.Control
                                                id="inputPasswordConfirm"
                                                type="password"
                                                placeholder="Confirm password"
                                                name="confirm_password"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                isInvalid={errors.confirm_password}
                                            />
                                            <Form.Label htmlFor="inputPasswordConfirm">Confirm Password</Form.Label>
                                            <Form.Control.Feedback type="invalid">Confirm password is required</Form.Control.Feedback>
                                        </Form.Floating>
                                    </Col>
                                </Row>
                                <div className="mt-4 mb-0">
                                    <Button variant="primary" type="submit" style={{ width: '100%' }}>Create Account</Button>
                                </div>
                            </Form>
                        </div>
                        <div className="card-footer text-center py-3">
                            <div className="small"><a href="/login">Have an account? Go to login</a></div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;

