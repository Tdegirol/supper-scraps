import React from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap"

const Footer = () => {
  return (
    <Card className="text-center text-light bg-dark">
      <Card.Body>
        <Card.Title>Why Use This App</Card.Title>
        {/* <Button variant="primary" className="mx-4">Environmental</Button>
        <Button variant="primary" className="mx-4">Economic</Button>
        <Button variant="primary" className="mx-4">Easy</Button> */}
        <Card.Text className='my-4'>
        {/* <h1>Search for Recipes!</h1>
        <h1>Search for Recipes!</h1>
        <h1>Search for Recipes!</h1> */}
          Spend less money |  Decrease GreenHouse Gases  |  Avoid the grocery store.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Footer;
