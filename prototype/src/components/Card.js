import React from "react";
import "../StyleSheet/Card.css";
function Card({ price, image, description, rating, title }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="" />
      </div>
      <div className="product-details">
        <div className="card-title">
          {title.length > 20 ? title.slice(0, 20) + "..." : title}

          <small className="card-description">
            {description.length > 50
              ? description.slice(0, 50) + "..."
              : description}
          </small>
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
