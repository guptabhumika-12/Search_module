import React from "react";

function Msitemenu(props) {
  return (
    <div className="autosuggest">
      <ul>
        {props.categoryList.map((pro) => {
          return (
            <li>
              <button
                // className="autosuggestoption"
                value={pro}
                onClick={(event) => {
                  props.setSearchCategory(event.target.value);
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
