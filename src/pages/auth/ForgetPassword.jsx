import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";


function ForgetPassword() {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row className="w-100">
                <Col md={4} className="mx-auto">
                    <div className="bg-white p-4 rounded shadow">
                        {/* Toggle Login/Signup */}


                        <div className="text-center mb-4">
                            <h2 className="text-primary">Welcome To</h2>
                            <h3 className="text-black">TRUSTED NETWORK PARTNER</h3>
                            <p>Forget Password</p>
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

                            <div className="d-grid">
                                <Button
                                    type="submit"
                                    variant="warning"
                                    className="rounded-pill fw-bold"
                                >
                                    Continue
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ForgetPassword