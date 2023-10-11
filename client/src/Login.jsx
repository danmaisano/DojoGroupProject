import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import loginUser from './components/loginUser';

const Login = (props) => {
  const { user, setUser } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false
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

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {
      email: !formData.email,
      password: !formData.password
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      loginUser(formData.email, formData.password, setUser, navigate);
    }
  };

  return (
    <Container fluid style={{ minHeight: '100vh', background: "#242424"}}>
      <Row className="justify-content-center">
        <Col lg={5}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Login</h3>
            </div>
            <div className="card-body">
              <Form onSubmit={handleLogin}>
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

                <Form.Floating className="mb-3">
                  <Form.Control
                    id="inputPassword"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={errors.password}
                  />
                  <Form.Label htmlFor="inputPassword">Password</Form.Label>
                  <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                </Form.Floating>

                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <a className="small" href="/forgot-password">Forgot Password?</a>
                  <Button variant="primary" type="submit">Login</Button>
                </div>
              </Form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small"><a href="/register">Need an account? Sign up!</a></div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;


