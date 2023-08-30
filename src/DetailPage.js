import React from "react";
import { useLocation } from "react-router-dom";

const DetailPage = (props) => {
  const location = useLocation();
  const item = location.state;

  if (!item) {
    return <h2>No Details Available.</h2>;
  }

  return (
    <div className="main">
      <img src={item.imageUrl} />
      <div className="details">
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>Address : {item.address}</p>
        <p>Beds : {item.bed}</p>
        <p>Bath : {item.bath}</p>
        <p>Property Type : {item.propertyType}</p>
        <p>Covered Area SQFT : {item.coveredAreaSQFT}</p>
        <p>Commercial : {item.isCommercial ? "Yes" : "No"}</p>
        <p>Price : {item.price}</p>
      </div>
    </div>
  );
};

export default DetailPage;
