  import React, { useState } from 'react';
  import { Button, Form, Container, Row, Col } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';

  const Login = () => {

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      axios.post('http://localhost:8081/users/login', formData)
        .then(res => {
          if (res.data.Status === "Success") {
            navigate('/')
          } else {
            alert(res.data.error)
          }
        })
        .catch(err => console.log(err))
    };

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  export default Login;
