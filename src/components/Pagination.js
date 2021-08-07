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

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        textAlign: "center",
        width: "100%",
      }}
    >
      <span
        style={{
          paddingLeft: "30px",
          paddingRight: "5px",
          // paddingBottom: "20px",
          fontSize: "1rem",
        }}
      >
        Showing page {props.filter.page} of {props.lastPage}
        {/* </span> */}
        {props.filter.page !== 1 ? (
          // <span>
          <button
            style={{
              paddingLeft: "10px",
              paddingRight: "5px",
              fontSize: "1rem",
            }}
            onClick={handlePrev}
          >
            Previous
          </button>
        ) : (
          // </span>
          <span></span>
        )}
        {props.filter.page !== props.lastPage ? (
          // <span>
          <button
            style={{
              paddingLeft: "5px",
              fontSize: "1rem",
            }}
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          // </span>
          <span></span>
        )}
      </span>
    </div>
  );
}

export default Pagination;
