import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const handleGoogleLogin = () => {
        console.log("Google Login clicked");
    };

    const handleAppleLogin = () => {
        console.log("Apple Login clicked");
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
            window.location.reload();
            navigate("/"); // Redirect to the dashboard or another page after successful login
        } catch (error) {
            console.error("Error logging in:", error.message);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div
                className="border rounded shadow p-4 bg-white"
                style={{
                    maxWidth: "450px",
                    width: "100%",
                }}
            >
                <h3 className="text-center mb-4">Log in to <br />Real Time Chat</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
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
                    <Form.Group controlId="formPassword" className="mb-3">
                        <InputGroup className="position-relative">
                            <Form.Control
                                value={password}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="p-2"
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
                    <Button
                        className="w-100 mb-3 p-2"
                        variant="success"
                        style={{
                            borderRadius: "5px",
                        }}
                        onClick={handleLogin}
                    >
                        Continue
                    </Button>
                </Form>
                <div className="text-center mb-3">
                    <span>or</span>
                </div>
                <Button
                    onClick={handleGoogleLogin}
                    className="w-100 mb-3 p-2 d-flex align-items-center justify-content-center"
                    style={{
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                        border: "1px solid #ced4da",
                        color: "#000",
                    }}
                >
                    <FcGoogle size={24} className="me-2" /> Continue with Google
                </Button>
                <Button
                    onClick={handleAppleLogin}
                    className="w-100 p-2 d-flex align-items-center justify-content-center"
                    style={{
                        borderRadius: "5px",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                    }}
                >
                    <SiApple size={24} className="me-2" /> Continue with Apple
                </Button>
                <div className="text-center mt-3">
                    <span>Don't have an account?</span>
                </div>
                <Button
                    className="w-100 mt-2 p-2"
                    variant="outline-success"
                    style={{
                        borderRadius: "5px",
                    }}
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </Button>
            </div>
        </Container>
    );
};

export default Login;
