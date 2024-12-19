import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase'; // Import the `auth` from your firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const validateInputs = () => {
        let isValid = true;

        if (!email) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Enter a valid email address.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        setError(""); // Clear any existing error messages

        if (!validateInputs()) {
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken(); // Get the auth token
            localStorage.setItem("authToken", token); // Store token in local storage
            console.log("User logged in:", userCredential.user);
            navigate("/"); // Redirect to the dashboard or another page after successful login
        } catch (error) {
            console.error("Error logging in:", error.message);
            setError("Invalid email or password. Please try again.");
        }
    };


    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row className="w-100">
                <Col md={4} className="mx-auto">
                    <div className="bg-white p-4 rounded shadow">
                        {/* Toggle Login/Signup */}
                        <div className="d-flex justify-content-center  mb-3">
                            <Button
                                variant="dark"
                                className="rounded-start px-4"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outline-dark"
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
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    className="rounded-pill"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <div className="text-danger mt-1">{emailError}</div>}
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="position-relative">
                                    <Form.Control
                                        value={password}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="rounded-pill pe-5" // Add padding to avoid text overlapping with icon
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


                            <div className="text-end mb-3">
                                <a href="/forgot-password" className="text-primary">
                                    Forgot Password?
                                </a>
                            </div>


                            <div className="d-grid">
                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="rounded-pill fw-bold"
                                    onClick={handleLogin}
                                >
                                    LOGIN
                                </Button>
                            </div>
                        </Form>


                        <div className="text-center mt-3">
                            <p>
                                Don't have an account?{" "}
                                <span
                                    className="text-primary cursor-pointer"
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
