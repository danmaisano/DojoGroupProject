import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const PasswordUpdate = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
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

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !formData.email,
      password: !formData.password,
      confirmPassword: !formData.confirmPassword,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      axios
        .put(`http://localhost:8081/users/updatePassword/${token}`, {
          token: token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(errors);
        });
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={5}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                Update Password
              </h3>
            </div>
            <div className="card-body">
              <Form onSubmit={handlePasswordUpdate}>
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
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="inputPassword"
                    type="password"
                    placeholder="name@example.com"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={errors.password}
                  />
                  <Form.Label htmlFor="inputPassword">Password</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Password is required
                  </Form.Control.Feedback>
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    id="inputConfirmPassword"
                    type="password"
                    placeholder="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={errors.confirmPassword}
                  />
                  <Form.Label htmlFor="inputPassword">
                    Confirm Password
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Confirm Password is required
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
