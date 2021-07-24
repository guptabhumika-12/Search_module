import React, { useState, useCallback, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import FlipkartLogo from "./FlipkartLogo";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../StyleSheet/Products.css";
function Products(props) {
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = useCallback(
    (event) => {
      setInput(event.target.value);
    },
    [input]
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSelectedOption(null);
      if (input) {
        props.setFilter({
          s: input,
          sort: "",
          page: 1,
        });
      } else {
        alert("please enter a product to search");
      }
    }
  };

  const clickhandler = (event) => {
    setSelectedOption(null);
    if (input) {
      props.setFilter({
        ...props.filter,
        s: input,
      });
    } else {
      alert("please enter a product to search");
    }
  };

  const options = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ];
  const defaultOption = props.sort;

  const _onSelect = (event) => {
    setSelectedOption(event);
    props.setFilter({
      s: input,
      sort: event.value,
    });
  };

  return (
    <div className="page">
      <div className="header">
        <FlipkartLogo />
        <div className="header_second">
          <input
            placeholder="Search for products"
            type="text"
            onKeyDown={(event) => handleKeyDown(event)}
            onChange={(event) => handleChange(event)}
          />
          <SearchIcon onClick={(event) => clickhandler(event)} />
        </div>
      </div>

      <div className="container">
        <div className="dropdown_container">
          <Dropdown
            style={{ backgroundColor: "#73a47", height: "20px", width: "70px" }}
            right={true}
            className="dropdown"
            options={options}
            value={selectedOption}
            onChange={(event) => _onSelect(event)}
            placeholder="Sort"
          />
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {props.products.map((product) => {
            return (
              <div className="col">
                <div className="card shadow-sm">
                  <img
                    className="card-img-top"
                    src={product.image}
                    height={200}
                  />

                  <div className="card-body translate-card">
                    <p className="card-text">
                      {product.title.length > 17
                        ? product.title.slice(0, 17) + "..."
                        : product.title}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Rs {product.price}</small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
