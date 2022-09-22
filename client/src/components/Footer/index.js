import React from "react";
import {Container, Row, Col } from 'react-bootstrap';
import Economic from "../Economic";
import Convenient from "../Convenient";
import Environmental from "../Environmental";

const Footer = () => {
  return (
    <div className="footer text-center text-light bg-dark">
      <div className="py-4">
        <h3>Why Use This App?</h3>
        <Container>
          <Row>
          <Col className="my-2">
          <Convenient />
          </Col>
          <Col className="my-2">
          <Economic />
          </Col>
          <Col className="my-2">
          <Environmental />
          </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;