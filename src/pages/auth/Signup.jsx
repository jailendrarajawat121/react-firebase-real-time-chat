import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import to your firebase setup
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState(""); // State for error message
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleAgreementChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    const validateInputs = () => {
        let isValid = true;
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        if (!email) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Enter a valid email address.");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Password is required.");
            isValid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }

        if (!isAgreed) {
            setError("Please agree to the terms and conditions.");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error message

        if (!validateInputs()) {
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up successfully");
            alert("User signed up successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error signing up:", error.message);
            setError(error.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div
                className="border rounded shadow p-4 bg-white"
                style={{
                    maxWidth: "800px",
                    width: "100%",
                }}
            >
                <h3 className="text-center mb-4">
                    Sign up for <br />
                    Transfer Network Partner
                </h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <Row className="mb-4">
                    <Col>
                        <Button
                            onClick={() => console.log("Google Sign-Up clicked")}
                            className="w-100 mb-3 p-2 d-flex align-items-center justify-content-center"
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#fff",
                                border: "1px solid #ced4da",
                                color: "#000",
                            }}
                        >
                            <FcGoogle size={24} className="me-2" /> Sign up with Google
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={() => console.log("Apple Sign-Up clicked")}
                            className="w-100 mb-3 p-2 d-flex align-items-center justify-content-center"
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#000",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            <SiApple size={24} className="me-2" /> Sign up with Apple
                        </Button>
                    </Col>
                </Row>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    className="p-2"
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #ced4da",
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    className="p-2"
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #ced4da",
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    className="p-2"
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #ced4da",
                                    }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <div className="text-danger mt-1">{emailError}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Control
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="p-2"
                                    style={{
                                        borderRadius: "5px",
                                        border: "1px solid #ced4da",
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <InputGroup className="position-relative">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="p-2"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div
                                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                                        style={{ cursor: "pointer" }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </InputGroup>
                                {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <InputGroup className="position-relative">
                                    <Form.Control
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className="p-2"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <div
                                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                                        style={{ cursor: "pointer" }}
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </InputGroup>
                                {confirmPasswordError && <div className="text-danger mt-1">{confirmPasswordError}</div>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formAgreement">
                        <Form.Check
                            type="checkbox"
                            label="I agree to the terms and conditions"
                            checked={isAgreed}
                            onChange={handleAgreementChange}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        className="w-100 p-2"
                        variant="success"
                        style={{
                            borderRadius: "5px",
                        }}
                    >
                        Sign Up
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <p>Already have an account? <a href="/login">Sign In</a></p>
                </div>
            </div>
        </Container>
    );
};

export default Signup;
