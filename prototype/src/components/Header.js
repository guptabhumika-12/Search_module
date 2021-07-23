import React, { useState, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../StyleSheet/Header.css";
import FlipkartLogo from "./FlipkartLogo";
const Header = () => {
  const [searchString, setsearchString] = useState("");
  const handleChange = useCallback(
    (event) => {
      setsearchString(event.target.value);
    },
    [setsearchString]
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      {
        searchString
          ? alert(searchString)
          : alert("please enter a product to search");
      }
    }
  };

  const clickhandler = () => {
    searchString
      ? alert(searchString)
      : alert("please enter a product to search");
  };

  return (
    <div className="header">
      <FlipkartLogo />
      <div className="header_second">
        <input
          placeholder="Search for products"
          type="text"
          onKeyDown={handleKeyDown}
          onChange={(event) => handleChange(event)}
        />
        {console.log(searchString)}
        <SearchIcon onClick={() => clickhandler()} />
      </div>
    </div>
  );
};

export default Header;
