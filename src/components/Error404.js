import React from "react";
import "../StyleSheet/Product.css";
import Card from "./Card";

function Error404(props) {
  return (
    <div className="noResult-container">
      <h2 className="sorry">Sorry, are you looking for something else?</h2>
      <h4
        style={{
          color: "lightgrey",
        }}
      >
        Please check the spelling or try searching for something else
      </h4>
      <div>
        {/* <hr style={{ width: "600px" }} /> */}
        <hr />
        <h1 className="BrowseTitle">Browse More Categories...</h1>

        <div
          style={{
            // border: "grey dotted 1.5px",
            padding: "2rem",
            margin: " 3px 20px ",
          }}
        >
          <div className="wrapper-grid">
            {props.allCategory.map((cat) => {
              return (
                <button
                  className="browse404"
                  value={cat}
                  onClick={(event) => props.handleButton(event)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="wrapper-grid">
            {props.browseList.map((product) => {
              const cat = {
                value: "",
              };

              cat.value = product.category;
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
            })}
          </div>
        </div>
        {/* <br /> */}
        <hr style={{ width: "80%", borderColor: "lightgrey" }} />
      </div>
    </div>
  );
}

export default Error404;
