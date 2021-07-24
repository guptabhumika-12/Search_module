import React, { useState, useCallback, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import FlipkartLogo from "./FlipkartLogo";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../StyleSheet/Products.css";
function Products() {
  const [products, setProducts] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [filters, setFilter] = useState({
    s: "",
    sort: "",
    page: 1,
  });
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  //text input is entered
  useEffect(() => {
    (async () => {
      const arr = [];
      if (filters.s) {
        arr.push(`q=${filters.s}`);
        console.log(`I am a disco dancer q=${filters.s}`);
      }
      if (filters.sort) {
        arr.push(`_sort=price&_order=${filters.sort}`);
      }
      if (filters.page) {
        arr.push(`_page=${filters.page}&_limit=20`);
      }
      const response = await fetch(
        `http://localhost:8000/product?${arr.join("&")}`
      );
      const content = await response.json();
      console.log("content backend" + content);
      setProducts(filters.page === 1 ? content : [...products, ...content]);
      setProducts(content);
      console.log("product backend" + products);
      setLastPage(content.last_page);
    })();
  }, [filters]);

  const handleChange = useCallback(
    (event) => {
      setInput(event.target.value);
    },
    [setFilter]
  );
  useEffect(() => {
    (async () => {})();
  }, [filters.s]);

  //enter key handle
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSelectedOption(null);
      setFilter({
        s: "",
        sort: "",
        page: 1,
      });
      if (input) {
        setFilter({
          s: input,
          sort: "",
          page: 1,
        });
      } else {
        alert("please enter a product to search");
      }
    }
  };
  //search button click
  const clickhandler = (event) => {
    if (input) {
      setSelectedOption(null);
      setFilter({
        s: input,
        sort: "",
        page: 1,
      });
    } else {
      alert("please enter a product to search");
    }
  };
  //sorting Dropdown
  const options = [
    { value: "asc", label: "ascending" },
    { value: "desc", label: "descending" },
  ];
  const defaultOption = options[0];

  const _onSelect = (event) => {
    console.log(event);
    setSelectedOption(event.value);
    setFilter({
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
            style={{ backgroundColor: "#73a47", height: "20px", width: "50px" }}
            right={true}
            className="dropdown"
            options={options}
            defaultOption={selectedOption}
            onChange={(event) => _onSelect(event)}
            placeholder="Sort"
          />
        </div>{" "}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {products.map((product) => {
            return (
              <div className="col">
                <div className="card shadow-sm">
                  <img src={product.image} height={200} />
                  <div className="card-body">
                    <p className="card-text">{product.title}</p>
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
