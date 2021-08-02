import React, { useEffect, useState } from "react";
import Product from "./Product";
import "../StyleSheet/trial.css";
const Backend = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [lastPage, setLastPage] = useState(0);
  const [allCategory, setAllCategory] = useState([]);

  const [filters, setFilter] = useState({
    s: "",
    sort: "",
    page: 1,
    rating: "",
    category: "",
  });
  //get all categories in db
  useEffect(() => {
    (async () => {
      const firstFetch = await fetch(`http://localhost:8000/products`);
      let data = await firstFetch.json();
      console.log(data);
      let cat = [];

      data.forEach((product) => {
        if (cat.indexOf(product.category) === -1) {
          cat.push(product.category);
        }
      });
      setAllCategory(cat);
    })();
  });

  useEffect(() => {
    (async () => {
      const arr = [];
      if (filters.s) {
        arr.push(`q=${filters.s}`);
      }
      if (filters.sort) {
        arr.push(`_sort=price&_order=${filters.sort}`);
      }
      if (filters.page) {
        arr.push(`_page=${filters.page}&_limit=20`);
        console.log(filters.page);
      }
      if (filters.rating) {
        arr.push(`rating=${filters.rating}`);
      }

      if (filters.category) {
        arr.push(`category=${filters.category}`);
      }

      const response = await fetch(
        `http://localhost:8000/products?${arr.join("&")}`
      );
      const content = await response.json();
      setProducts(content);
      setLoading(false);
    })();
  }, [filters]);

  return (
    <div>
      {loading === false ? (
        <Product
          products={products}
          filter={filters}
          setFilter={setFilter}
          allCategory={allCategory}
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
