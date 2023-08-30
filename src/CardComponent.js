import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ data }) => {
    const navigate = useNavigate();

  const handleClick = (item) => {
    // console.log(item);
    navigate(`/details/${item.id}`, { state: item });
  };
  return (
    <div className="card-container">
      {data.map((item) => (
        <Card key={item.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={item.imageUrl} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.address}</Card.Text>
            <Card.Text>
              Beds: {item.beds} | Bath: {item.bath}
            </Card.Text>
            <Card.Text>Covered Area: {item.coveredAreaSQFT} sqft</Card.Text>
            <Card.Text>Price: {item.price}</Card.Text>
            <Button variant="primary" onClick={() => handleClick(item)}>
              View Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CardComponent;
