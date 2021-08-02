import React from "react";
import Card from "./Card";
const ProductRenderer = (props) => {
  const handleButton = (event) => {
    console.log(event.target.value);
    props.setFilter({
      ...props.filter,
      s: "",
      category: event.target.value,
    });
  };

  return (
    <div className="wrapper-grid">
      {props.products[0] ? (
        props.products.map((product) => {
          return (
            <div className="card-container">
              <Card
                image={product.image}
                title={product.title}
                rating={product.rating}
                description={product.description}
                price={product.price}
              />
            </div>
          );
        })
      ) : (
        <div className="noResult-container">
          <h3 style={{ color: "black" }}>Sorry, no results found!</h3>
          <h5
            style={{
              color: "lightgrey",
            }}
          >
            Please check the spelling or try searching for something else
          </h5>
          <img
            // src="https://www.kindpng.com/picc/m/691-6916285_no-results-found-hd-png-download.png"
            src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg"
            alt="error404"
            height="50%"
          />
          <div>
            <h5>Browse Categories...</h5>
            <div className="error404">
              {props.allCategory.map((cat) => {
                return (
                  <button value={cat} onClick={(event) => handleButton(event)}>
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRenderer;
