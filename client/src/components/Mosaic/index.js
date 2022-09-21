import { React } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import pics from "../../utils/pics";

const Mosaic = () => {
  const pics = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg"
  ];

  return (
    <div className="main-mosaic-container">
    <Container fluid className="mosaic-container">
      <Row className="mosaic-row">
        {pics.map((pic, index) => {
          return (
            <Col key={index} md="auto" className="mosaic-col">
              <Image
                src={"/images/" + pic}
                fluid
                className="mosaic-image"
              />
            </Col>
          );
        })}
      </Row>
    </Container>
    </div>
  );
};

export default Mosaic;
