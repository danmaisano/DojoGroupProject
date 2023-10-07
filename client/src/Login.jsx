  import { useState } from 'react';
  import { Button, Form, Container, Row, Col } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import Cookies from "js-cookie";
  import loginUser from './components/loginUser';
  

  const Login = (props) => {
    const {user, setUser} = props;
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

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

    const handleLogin = (e) => {
      e.preventDefault();
      loginUser(formData.email, formData.password, setUser, navigate);
    };
    

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
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
