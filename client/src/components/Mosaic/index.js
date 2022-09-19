import { React, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import pics from "../../utils/pics";

const Mosaic = () => {
  const pics = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'];

  return (
    <Container fluid className="mosaic-container">
      <Row className="mosaic-row">
        {pics.map((pic, index) => {
          return (
            <Col md="auto" className="mosaic-col">
              <Image key={index} src={'/images/'+pic} fluid className="mosaic-image" />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Mosaic;
