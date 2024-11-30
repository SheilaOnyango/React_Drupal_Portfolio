import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          "https://my-first-drupal-app.lndo.site/jsonapi/node/page"
        );
        setContactData(response.data.data[3]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return <div className="text-center py-5 text-light">Loading</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5">Error: {error.message}</div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <Container
        className="text-light py-5"
        style={{
          maxWidth: "600px",
          backgroundColor: "#1c1c1c",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-center fw-bold mb-4">
          {contactData.attributes.field_heading[0]}
        </h2>
        <p className="text-center">
          {contactData.attributes.field_paragraph[0]}
        </p>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label className="text-light">Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label className="text-light">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="text-light">Your E-mail Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #ccc",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label className="text-light">Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Write your message here"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #ccc",
              }}
            />
          </Form.Group>

          <div className="text-center">
            <Button
              variant="light"
              type="submit"
              className="px-4"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "30px",
                padding: "10px 20px",
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Contact;
