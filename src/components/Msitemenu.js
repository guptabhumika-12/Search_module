import React from "react";

function Msitemenu(props) {
  const addoption = ["All Categories", ...props.categoryList];

  return (
    <div className="autosuggest">
      <ul
        style={{
          padding: "3px 5px",
          marginTop: 0,
        }}
      >
        {addoption.map((pro) => {
          return (
            <li
              style={{
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <button
                style={{ active: { color: "rgb(53, 185, 247);" } }}
                className="autosuggestoption"
                value={pro}
                onClick={(event) => {
                  if (event.target.value !== "All Categories") {
                    props.setSearchCategory(event.target.value);
                  } else props.setSearchCategory(null);
                  props.setOpen(!props.open);
                }}
              >
                {pro}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Msitemenu;
