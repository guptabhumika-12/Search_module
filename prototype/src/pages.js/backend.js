import React, { useEffect, useState } from "react";

const Backend = () => {
  const [products, setProducts] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [filters, setFilters] = useState({
    s: "",
    sort: "",
    page: 1,
  });
  useEffect(() => {
    (async () => {
      const arr = [];
      if (filters.s) {
        arr.push("q=${filters}.s");
      }
      if (filters.sort) {
        arr.push("_sort=price&_order=${filters}.sort");
      }
      if (filters.page) {
        arr.push("_page=${filters}.page&_limit=10");
      }
      const response = await fetch(
        "http://localhost:8000/product?${arr.join(" & ")}"
      );
      const content = await response.json();
      setProducts(
        filters.page === 1 ? content.data : [...products, ...content.data]
      );
      setLastPage(content.last_page);
    })();
  }, [filters]);
  return (
    <div>
      <Product
        products={products}
        filters={filters}
        setFilters={setFilters}
        lastPage={lastPage}
      />
    </div>
  );
};

export default Backend;
