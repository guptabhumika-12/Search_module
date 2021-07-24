import React, { useEffect, useState } from "react";
import Product from "./Products";

const Backend = () => {
  const [products, setProducts] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [filters, setFilter] = useState({
    s: "",
    sort: "",
    page: 1,
  });

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

  return (
    <div>
      <Product
        products={products}
        filter={filters}
        setFilter={setFilter}
        lastPage={lastPage}
      />
    </div>
  );
};

export default Backend;
