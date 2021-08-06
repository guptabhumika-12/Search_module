import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import Header from "./Header";
import Card from "./Card";
import "../StyleSheet/Product.css";
import Pagination from "./Pagination";
import Error404 from "./Error404";
var _ = require("lodash");

function Products(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectRating, setSelectRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleButton = (event) => {
    console.log(event.target.value);
    props.setFilter({
      ...props.filter,
      s: "",
      category: event.target.value,
    });
  };
  const options = [
    { value: "price", label: "Price: Low to High" },
    { value: "-price", label: "Price: High to Low" },
  ];

  const rates = [
    { value: "1", label: "⭐ & Up" },
    { value: "2", label: "⭐⭐ & Up" },
    { value: "3", label: "⭐⭐⭐ & Up" },
    { value: "4", label: "⭐⭐⭐⭐ & Up" },
    { value: "5", label: "⭐⭐⭐⭐⭐" },
  ];

  const handleReset = (event) => {
    setSelectedOption(null);
    setSelectRating(null);
    setSelectedCategory(null);
    props.setFilter({
      ...props.filter,
      rating: "",
      sort: "",
      category: "",
      page: 1,
    });
  };

  const productCategoryList = [];
  props.products.forEach((product) => {
    if (
      productCategoryList.indexOf(_.upperFirst(_.toLower(product.category))) ===
      -1
    ) {
      productCategoryList.push(_.upperFirst(_.toLower(product.category)));
    }
  });

  return (
    <div className="page">
      <nav>
        <Header
          filter={props.filter}
          setFilter={props.setFilter}
          setSelectRating={setSelectRating}
          setSelectedOption={setSelectedOption}
          categoryList={props.allCategory}
          setSearchCategory={props.setSearchCategory}
          searchCategory={props.searchCategory}
          setSelectedCategory={setSelectedCategory}
          input={props.input}
          setInput={props.setInput}
          suggestion={props.suggestion}
          setSuggestion={props.setSuggestion}
        />
      </nav>

      <div
        className="filter-section"
        style={{ display: props.products[0] ? "block" : "none" }}
      >
        <div className="filter-header">
          <h4>Filters </h4>
          <div className="filter-button">
            <button
              onClick={(event) => {
                handleReset(event);
              }}
            >
              Show All Products
            </button>
          </div>
        </div>

        <div className="dropdown-element">
          <DropdownMenu
            selectedOption={selectedCategory}
            options={productCategoryList}
            filter={props.filter}
            setFilter={props.setFilter}
            setSelectedOption={setSelectedCategory}
            placeholder={"Select Category"}
            parameter="sc"
          />
        </div>
        <div className="dropdown-element">
          <DropdownMenu
            selectedOption={selectedOption}
            options={options}
            filter={props.filter}
            setFilter={props.setFilter}
            setSelectedOption={setSelectedOption}
            placeholder={"Sort: by Price"}
            parameter="s"
          />
        </div>
        <div className="dropdown-element">
          <DropdownMenu
            selectedOption={selectRating}
            options={rates}
            filter={props.filter}
            setFilter={props.setFilter}
            setSelectedOption={setSelectRating}
            placeholder={"Select Rating"}
            parameter="r"
          />
        </div>
      </div>

      {props.products[0] ? (
        <div className="row">
          <div
            className="wrapper-grid "
            style={{
              justifyContent: props.products[2] ? "space-evenly" : "flex-start",
            }}
          >
            {props.products.map((product) => {
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
          <div className="pagination">
            <Pagination
              setFilter={props.setFilter}
              filter={props.filter}
              lastPage={props.lastPage}
            />
          </div>
        </div>
      ) : (
        <Error404
          handleButton={handleButton}
          allCategory={props.allCategory}
          browseList={props.browseList}
          setFilter={props.setFilter}
        />
      )}
    </div>
  );
}

export default Products;
