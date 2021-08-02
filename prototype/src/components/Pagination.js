import React from "react";

function Pagination(props) {
  const handlePrev = () => {
    props.setFilter({
      ...props.filter,
      page: props.filter.page - 1,
    });
  };
  const handleNext = () => {
    props.setFilter({
      ...props.filter,
      page: props.filter.page + 1,
    });
  };
  let prev;

  if (props.filter.page !== 1) {
    prev = () => {
      return (
        <span>
          <button onClick={handlePrev}>Previous</button>
        </span>
      );
    };
  }
  let next;

  if (props.filter.page === props.lastPage) {
    next = () => {
      return (
        <span>
          <button onClick={handleNext}>Next</button>
        </span>
      );
    };
  }

  return (
    <div>
      <span>
        showing page {props.filter.page}of {props.lastPage}
      </span>
      <span>{prev}</span>
      <span>{props.filter.page}</span>
      <span>{next}</span>
    </div>
  );
}

export default Pagination;
