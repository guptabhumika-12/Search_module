import React, { useEffect, useState } from "react";
import Product from "./Product";
import "../StyleSheet/Product.css";
const Backend = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [allCategory, setAllCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState(null);
  const [filters, setFilter] = useState({
    s: "",
    sort: "",
    page: 1,
    rating: "",
    category: "",
  });
  //fetch call to get all categories at start of the program
  useEffect(() => {
    (async () => {
      const firstFetch = await fetch(
        `http://localhost:8000/api/v1/products?limit=20`
      );
      let content = await firstFetch.json();
      let list = [];
      list = content.data.product;
      let cat = [];
      console.log("Category", list);

      list.forEach((product) => {
        if (cat.indexOf(product.category) === -1) {
          cat.push(product.category);
        }
      });

      setAllCategory(cat);
    })();
  }, []);

  //fetch call for product array
  useEffect(() => {
    (async () => {
      const arr = [];
      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }
      if (filters.sort) {
        if (filters.sort === "asc") arr.push(`sort=price`);
        else arr.push(`sort=-price`);
      }
      if (filters.page) {
        arr.push(`page=${filters.page}&limit=8`);
        console.log(filters.page);
      }
      if (filters.rating) {
        arr.push(`rating[gte]=${filters.rating}`);
      }

      if (filters.category) {
        arr.push(`category=${filters.category}`);
      }
      let query = arr.join("&");
      const response = await fetch(
        `http://localhost:8000/api/v1/products?&${query}`
      );
      const content = await response.json();
      let list = [];
      list = content.data.product;
      setLastPage(content.lastPage);
      setProducts(list);
      setLoading(false);
    })();
  }, [filters]);

  //fetch call for autsuggestions
  useEffect(() => {
    (async () => {
      const arr = [];
      if (input) {
        arr.push(`s=${input}`);
      }

      if (searchCategory) {
        arr.push(`category=${searchCategory}`);
      }
      let query = arr.join("&");
      const response = await fetch(
        `http://localhost:8000/api/v1/products?&${query}`
      );
      const content = await response.json();
      let list = [];
      list = content.data.product;
      setSuggestion(list);
    })();
  }, [input, searchCategory]);

  return (
    <div>
      {loading === false ? (
        <Product
          products={products}
          filter={filters}
          setFilter={setFilter}
          allCategory={allCategory}
          lastPage={lastPage}
          input={input}
          setInput={setInput}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          suggestion={suggestion}
          setSuggestion={setSuggestion}
        />
      ) : (
        <div className="loader-div">
          <div id="floatingBarsG">
            <div className="blockG" id="rotateG_01"></div>
            <div className="blockG" id="rotateG_02"></div>
            <div className="blockG" id="rotateG_03"></div>
            <div className="blockG" id="rotateG_04"></div>
            <div className="blockG" id="rotateG_05"></div>
            <div className="blockG" id="rotateG_06"></div>
            <div className="blockG" id="rotateG_07"></div>
            <div className="blockG" id="rotateG_08"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Backend;
