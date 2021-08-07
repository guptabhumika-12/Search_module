import React from "react";
import OverflowTip from "./OverFlowTip";
import "../StyleSheet/Card.css";
function Card({ price, image, description, rating, title }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="" />
      </div>
      <div className="product-details">
        <div className="card-title">
          <div className="card-title1">
            <OverflowTip>{title}</OverflowTip>
            <small className="card-description">
              <OverflowTip>{description}</OverflowTip>
            </small>
          </div>
        </div>
        <div className="card-size">
          <span className="card-price">₹{price}</span>
          <span className="card-rating">{rating} &#9733;</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
