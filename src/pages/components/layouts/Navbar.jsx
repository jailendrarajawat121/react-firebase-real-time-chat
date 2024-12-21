import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase'; // Ensure you import auth
import { signOut } from "firebase/auth"; // Import signOut
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            localStorage.removeItem('authToken'); // Redirect to login page
            window.location.reload();
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="px-3">
            <Navbar.Brand href="#">
                <div className="d-flex align-items-center">
                    <span className="ms-2">Real Time Chat</span>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto ms-4">
                    <Nav.Link href="#profile">PROFILE</Nav.Link>
                    <Nav.Link href="#real-estate">REAL ESTATE</Nav.Link>
                    <Nav.Link href="#partners">PARTNERS</Nav.Link>
                    <Nav.Link href="/">
                        CHAT <span className="badge bg-warning text-dark">3</span>
                    </Nav.Link>
                </Nav>

                <Nav className="align-items-center">
                    <Nav.Link href="#notifications" className="mx-2">
                        <i className="bi bi-bell"></i>
                    </Nav.Link>
                    <NavDropdown title="RB" id="user-dropdown">
                        <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;