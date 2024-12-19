import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

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
                                variant="warning"
                                className="rounded-start px-4"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outline-warning"
                                className="rounded-end px-4 mx-2"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <div className="text-center mb-4">
                            <h2 className="text-primary">Welcome To</h2>
                            <h3 className="text-black">TRUSTED NETWORK PARTNER</h3>
                            <p>Sign in to continue with your account</p>
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


                            <div className="text-end mb-3">
                                <a href="/forgot-password" className="text-warning">
                                    Forgot Password?
                                </a>
                            </div>


                            <div className="d-grid">
                                <Button
                                    type="submit"
                                    variant="warning"
                                    className="rounded-pill fw-bold"
                                >
                                    LOGIN
                                </Button>
                            </div>
                        </Form>


                        <div className="text-center mt-3">
                            <p>
                                Don't have an account?{" "}
                                <span
                                    className="text-warning cursor-pointer"
                                    onClick={() => navigate("/signup")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Sign Up
                                </span>
                            </p>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
