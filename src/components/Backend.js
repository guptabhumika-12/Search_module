import React, { useEffect, useState } from "react";
import Product from "./Product";
import Loader from "./Loader";
import "../StyleSheet/loader.css";
var _ = require("lodash");
const Backend = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [allCategory, setAllCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState(null);
  const [browseList, setBrowseList] = useState([]);
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
      const firstFetch = await fetch(`http://localhost:8000/api/v1/products`);
      let content = await firstFetch.json();
      let list = [];
      list = content.data.product;

      let cat = [];
      console.log("Category", list);

      list.forEach((product) => {
        if (cat.indexOf(_.upperFirst(_.toLower(product.category))) === -1) {
          cat.push(_.upperFirst(_.toLower(product.category)));
        }
      });
      setAllCategory(cat);
      setBrowseList(list.slice(0, 4));
    })();
  }, []);

  //fetch call for product array
  useEffect(() => {
    (async () => {
      const arr = [];
      if (filters.s) {
        let str = filters.s;
        str = str.slice(0, 35);
        arr.push(`s=${str}`);
      }
      if (filters.sort) {
        arr.push(`sort=${filters.sort}`);
      }
      if (filters.page) {
        arr.push(`page=${filters.page}&limit=5`);
      }
      if (filters.rating) {
        arr.push(`rating[gte]=${filters.rating}`);
      }

      if (filters.category) {
        arr.push(`category=${filters.category.toLowerCase()}`);
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
        arr.push(`category=${searchCategory.toLowerCase()}`);
      }
      let query = arr.join("&");
      const response = await fetch(
        `http://localhost:8000/api/v1/products?&${query}`
      );
      const content = await response.json();
      if (content.status === "success") {
        let list = [];
        list = content.data.product;
        setSuggestion(list);
      } else {
        setSuggestion([]);
      }
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
          browseList={browseList}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Backend;
