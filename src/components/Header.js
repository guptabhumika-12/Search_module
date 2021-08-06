import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../StyleSheet/header1.css";
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
  const [textfield, setTextfield] = useState("");
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (open && ref.current && !ref.current.contains(e.target)) {
        setTimeout(() => {
          setOpen(!open);
        }, 500);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);
  const handleChange = useCallback(
    (event) => {
      setInput(event.target.value);
      setTextfield(event.target.value);
      console.log(event.target.value);
      setSuggestOpen(true);
      // if (input.length > 0) setSuggestOpen(true);
    },
    [setInput]
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (textfield) {
        setSelectedOption(null);
        setSelectRating(null);
        setSelectedCategory(null);
        setFilter({
          s: textfield,
          sort: "",
          page: 1,
          category: "",
        });
      } else {
        alert("please enter a product to search");
      }
      setInput("");
    }
  };
  const clickhandler = (event) => {
    if (textfield) {
      setSelectedOption(null);
      setSelectRating(null);
      setSelectedCategory(null);
      setSearchCategory(null);
      setFilter({
        s: textfield,
        sort: "",
        page: 1,
        category: "",
      });
    } else {
      alert("please enter a product to search");
    }
    setInput("");
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
              value={textfield}
              onKeyDown={(event) => handleKeyDown(event)}
              onChange={(event) => handleChange(event)}
              onBlur={() =>
                setTimeout(() => {
                  setSuggestOpen(!setSuggestOpen);
                }, 500)
              }
            />
            <SearchIcon onClick={(event) => clickhandler(event)} />
            <div className="header_third">
              <TuneIcon
                onClick={() => {
                  setOpen(!open);
                }}
              />
              {open ? (
                <div className="menu-dropdown" ref={ref}>
                  <div class="arrow-up"></div>
                  <div className="categorylist">
                    <Msitemenu
                      categoryList={categoryList}
                      searchCategory={searchCategory}
                      setSearchCategory={setSearchCategory}
                      open={open}
                      setOpen={setOpen}
                    />
                  </div>
                </div>
              ) : (
                <div className="redundant"></div>
              )}
            </div>
          </div>
          <div className="header_second2">
            {input !== "" && suggestion.length > 0 && suggestOpen ? (
              <ul>
                {suggestion.slice(0, 5).map((pro) => {
                  return (
                    <li>
                      <button
                        className="autosuggestoption"
                        value={pro.title}
                        onClick={(event) => {
                          setTextfield(event.target.value);
                          console.log("input set hogy");
                          setFilter({
                            s: event.target.value,
                            sort: "",
                            page: 1,
                            rating: "",
                            category: "",
                          });
                          setInput("");
                          setSelectedOption(null);
                          setSelectRating(null);
                          setSelectedCategory(null);
                          setSuggestOpen(false);
                        }}
                      >
                        {pro.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="redundant"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
