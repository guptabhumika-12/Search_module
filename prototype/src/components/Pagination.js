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
        textAlign: "left",
        marginLeft: "3.5rem",
      }}
    >
      <span>
        Showing page {props.filter.page} of {props.lastPage}
      </span>
      {props.filter.page !== 1 ? (
        <span>
          <button
            style={{
              paddingLeft: "10px",
              paddingRight: "5px",
            }}
            onClick={handlePrev}
          >
            Previous
          </button>
        </span>
      ) : (
        <span></span>
      )}

      {props.filter.page !== props.lastPage ? (
        <span>
          <button style={{ paddingLeft: "5px" }} onClick={handleNext}>
            Next
          </button>
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Pagination;
