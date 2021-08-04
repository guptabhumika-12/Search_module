import React, { useState, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../StyleSheet/Header.css";
import DropdownMenu from "./DropdownMenu";
import Msitemenu from "./Msitemenu";
import TuneIcon from "@material-ui/icons/Tune";
function Header({
  filter,
  setFilter,
  setSelectRating,
  setSelectedOption,
  categoryList,
  searchCategory,
  setSearchCategory,
  setSelectedCategory,
  input,
  setInput,
  suggestion,
  setSuggestion,
}) {
  const [open, setOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);

  const handleChange = useCallback(
    (event) => {
      setInput(event.target.value);
      console.log(event.target.value);
      // if (input.length > 0) setSuggestOpen(true);
    },
    [setInput]
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (input) {
        setSelectedOption(null);
        setSelectRating(null);
        setSelectedCategory(null);
        setFilter({
          s: input,
          sort: "",
          page: 1,
          category: "",
        });
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
      setSearchCategory(null);
      setFilter({
        s: input,
        sort: "",
        page: 1,
        category: "",
      });
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
          <div className="header_second1">
            <div className="category-dropdown">
              <DropdownMenu
                selectedOption={searchCategory}
                options={categoryList}
                filter={filter}
                setFilter={setFilter}
                setSelectedOption={setSearchCategory}
                placeholder="Category"
                parameter="c"
              />
            </div>
            <input
              placeholder="What product are you looking for ?"
              type="text"
              value={input}
              onKeyDown={(event) => handleKeyDown(event)}
              onChange={(event) => handleChange(event)}
              onBlur={() =>
                setTimeout(() => {
                  // setSuggestion([]);
                  setSuggestOpen(false);
                }, 500)
              }
            />
            <SearchIcon onClick={(event) => clickhandler(event)} />
          </div>
          <div className="header_second2">
            {input !== "" && suggestion !== [] && !suggestOpen ? (
              <div className="autosuggest">
                <ul>
                  {suggestion.slice(0, 5).map((pro) => {
                    return (
                      <li>
                        <button
                          className="autosuggestoption"
                          value={pro.title}
                          onClick={(event) => {
                            setInput(event.target.value);
                            setSelectedOption(null);
                            setSelectRating(null);
                            setSelectedCategory(null);
                            setSearchCategory(null);
                            setFilter({
                              ...filter,
                              s: input,
                            });
                            setSuggestion([]);
                            setSuggestOpen(false);
                          }}
                        >
                          {pro.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="header_third">
        <TuneIcon
          className="MenuButton"
          onClick={() => {
            setOpen(!open);
          }}
        />
        {open ? (
          <Msitemenu
            categoryList={categoryList}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            open={open}
            setOpen={setOpen}
          />
        ) : (
          <div className="redundant"></div>
        )}
      </div>
    </div>
  );
}

export default Header;
