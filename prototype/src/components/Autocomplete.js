// import { SettingsInputAntenna } from "@material-ui/icons";
import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function Autocomplete({ autoSugPro, setInput }) {
  const Onautosugg = (event) => {
    setInput(event.value);
    console.log(event.value);
  };

  const arr = autoSugPro.map((pro) => {
    return pro.title;
  });

  return arr.length === 0 ? (
    <div></div>
  ) : (
    <div>
      {/* {console.log("autp" + autoSugPro)} */}
      {}
      <Dropdown
        className="dropdown"
        options={arr.slice(0, 5)}
        // options={[1, 2, 3, 4]}
        // value={selectedOption}
        onChange={(event) => Onautosugg(event)}
        // placeholder={placeholder}
      />
      {/* {(event) => } */}
    </div>
  );
}

export default Autocomplete;
