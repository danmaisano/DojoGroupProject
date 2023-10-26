import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PasswordUpdate = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the error for the specific input field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value,
    }));
  };

  const handleEmailSubmit = async (e) => {
    const email = formData.email
    console.log(email)
    e.preventDefault();
  
    const newErrors = {
      email: !formData.email,
    };
  
    setErrors(newErrors);
  
    if (!Object.values(newErrors).some((error) => error)) {
      try {
        axios.post('http://localhost:8081/users/forgotPassword', {email})
            .then(res => {
              navigate('/')
            })
            .catch(err => console.log(err));
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={5}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                Enter Email
              </h3>
            </div>
            <div className="card-body">
              <Form onSubmit={handleEmailSubmit}>
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
                  <Form.Label htmlFor="inputEmail">Enter Your Email</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Email is required
                  </Form.Control.Feedback>
                </Form.Floating>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
            <div className="card-footer text-center py-3"></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordUpdate;
