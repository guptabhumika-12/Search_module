import React, { useState, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../StyleSheet/Header.css";
import DropdownMenu from "./DropdownMenu";
function Header({
  filter,
  setFilter,
  setSelectRating,
  setSelectedOption,
  categoryList,
  searchCategory,
  setSearchCategory,
  selectedCategory,
  setSelectedCategory,
}) {
  const [input, setInput] = useState("");
  const handleChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (input) {
        setSelectedOption(null);
        setSelectRating(null);
        setSelectedCategory(null);
        if (searchCategory) {
          setFilter({
            s: input,
            sort: "",
            page: 1,
            category: searchCategory,
          });
        } else {
          setFilter({
            s: input,
            sort: "",
            page: 1,
            category: "",
          });
        }
      } else {
        alert("please enter a product to search");
      }
    }
  };
  const clickhandler = (event) => {
    if (input) {
      setSelectedOption(null);
      setSelectRating(null);
      setSelectedCategory(null);
      if (searchCategory) {
        setFilter({
          s: input,
          sort: "",
          page: 1,
          category: searchCategory,
        });
      } else {
        setFilter({
          s: input,
          sort: "",
          page: 1,
          category: "",
        });
      }
    } else {
      alert("please enter a product to search");
    }
  };
  return (
    <div className="header-container">
      <div className="header">
        <div className="header_first">
          <img
            src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
            alt="Flipkart-logo"
          />
          <div className="header_first1">
            <span
              style={{
                fontSize: "12px",
                color: "white",
                fontStyle: "italic",
              }}
            >
              Explore
            </span>
            <span
              style={{
                color: "#f9e107",
                fontSize: "12px",
                fontStyle: "italic",
                paddingLeft: "2px",
              }}
            >
              Plus
            </span>
            <span>
              <img
                width="10"
                src="
          //img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
                alt="plus-logo"
              />
            </span>
          </div>
        </div>

        <div className="header_second">
          <div className="category-dropdown">
            <DropdownMenu
              selectedOption={searchCategory}
              options={categoryList}
              filter={filter}
              setFilter={setFilter}
              setSelectedOption={setSearchCategory}
              placeholder="search in"
              parameter="c"
            />
          </div>
          <input
            placeholder="Search for products"
            type="text"
            onKeyDown={(event) => handleKeyDown(event)}
            onChange={(event) => handleChange(event)}
          />
          <SearchIcon onClick={(event) => clickhandler(event)} />
        </div>
        <div className="header_third"> </div>
      </div>
    </div>
  );
}

export default Header;
