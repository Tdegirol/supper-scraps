import React from "react";
import {Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="footer text-center text-light bg-dark">
      <div className="py-4">
        <h3>Why Use This App</h3>
        <Container>
          <Row>
          <Col className="my-4">
            Spend less money
          </Col>
          <Col className="my-4">
            Decrease greenhouse gases
          </Col>
          <Col className="my-4">
          Avoid the grocery store
          </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;