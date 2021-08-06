import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
function DropdownMenu({
  selectedOption,
  options,
  filter,
  setFilter,
  setSelectedOption,
  placeholder,
  parameter,
}) {
  if (parameter === "c") {
    const addoption = [{ value: null, label: "All Categories" }];
    options = [...options, ...addoption];
  }
  const onOptionChange = (event) => {
    setSelectedOption(event.value);
    if (parameter === "r") {
      setFilter({
        ...filter,
        page: 1,
        rating: event.value,
      });
    } else if (parameter === "s") {
      setFilter({
        ...filter,
        page: 1,
        sort: event.value,
      });
    } else if (parameter === "sc") {
      setFilter({
        ...filter,
        page: 1,
        category: event.value,
      });
    } else {
      console.log(options);
    }
  };

  return (
    <div className="dropdown-container">
      <Dropdown
        className="dropdown"
        options={options}
        value={selectedOption}
        onChange={(event) => onOptionChange(event)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default DropdownMenu;
