import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import Header from "./Header";
import Card from "./Card";
import "../StyleSheet/trial.css";
// import Pagination from "./Pagination";
function Products(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectRating, setSelectRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchCategory, setSearchCategory] = useState(null);
  const handleButton = (event) => {
    console.log(event.target.value);
    props.setFilter({
      ...props.filter,
      s: "",
      category: event.target.value,
    });
  };
  const options = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ];

  const rates = [
    { value: "1", label: "⭐" },
    { value: "2", label: "⭐⭐" },
    { value: "3", label: "⭐⭐⭐" },
    { value: "4", label: "⭐⭐⭐⭐" },
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
  // const pageChange = () => {
  //   props.setFilter({
  //     ...props.filter,
  //     page: props.filter.page + 1,
  //   });
  // };
  const productCategoryList = [];
  props.products.forEach((product) => {
    if (productCategoryList.indexOf(product.category) === -1) {
      productCategoryList.push(product.category);
    }
  });
  // let button;
  // if (props.filter.page !== props.) {
  //   button = (
  //     <div>
  //       <button
  //         style={{
  //           backgroundColor: "blue",
  //           alignSelf: "center",
  //         }}
  //         onClick={pageChange}
  //       >
  //         Load more
  //       </button>
  //     </div>
  //   );
  // }
  return (
    <div className="page">
      <nav>
        <Header
          filter={props.filter}
          setFilter={props.setFilter}
          setSelectRating={setSelectRating}
          setSelectedOption={setSelectedOption}
          categoryList={props.allCategory}
          setSearchCategory={setSearchCategory}
          searchCategory={searchCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </nav>

      <div className="filter-section">
        <div className="filter-header">
          <h1>Filters </h1>
          <button
            onClick={(event) => {
              handleReset(event);
            }}
          >
            Clear All
          </button>
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
            placeholder={"Sort: by Rating"}
            parameter="r"
          />
        </div>
      </div>

      <div className="row">
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
                src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg"
                alt="error404"
                height="50%"
              />
              <div>
                <h5>Browse Categories...</h5>
                <div className="error404">
                  {props.allCategory.map((cat) => {
                    return (
                      <button
                        value={cat}
                        onClick={(event) => handleButton(event)}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <Pagination
          setFilter={props.setFilter}
          filter={props.filter}
          ={props.}
        /> */}
      </div>
    </div>
  );
}

export default Products;
