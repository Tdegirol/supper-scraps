import React from 'react';
import { Card } from "react-bootstrap"

const Footer = () => {
  return (
    <Card className="text-center text-light bg-dark">
      <Card.Body>
        <Card.Title>Why Use This App</Card.Title>
        <Card.Text className='my-4'>
          Spend less money |  Decrease GreenHouse Gases  |  Avoid the grocery store.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Footer;
