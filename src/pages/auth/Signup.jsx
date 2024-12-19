import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row className="w-100">
                <Col md={4} className="mx-auto">
                    <div className="bg-white p-4 rounded shadow">
                        {/* Toggle Login/Signup */}
                        <div className="d-flex justify-content-center  mb-3">
                            <Button
                                variant="outline-dark"
                                className="rounded-start px-4"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                variant="dark"
                                className="rounded-end px-4 mx-2"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <div className="text-center mb-4">
                            <h2 className="text-primary">Welcome To</h2>
                            <h3 className="text-black">TRUSTED NETWORK PARTNER</h3>
                            <p>Create a new account to get started</p>
                        </div>

                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    className="rounded-pill"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="position-relative">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="rounded-pill pe-5" // Add padding to avoid text overlapping with icon
                                    />
                                    <div
                                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                                        style={{ cursor: "pointer" }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </InputGroup>
                            </Form.Group>


                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="rounded-pill"
                                />
                            </Form.Group>


                            <div className="d-grid">
                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="rounded-pill fw-bold"
                                >
                                    SIGN UP
                                </Button>
                            </div>
                        </Form>


                        <div className="text-center mt-3">
                            <p>
                                Already have an account?{" "}
                                <span
                                    className="text-primary cursor-pointer"
                                    onClick={() => navigate("/login")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Login
                                </span>
                            </p>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup