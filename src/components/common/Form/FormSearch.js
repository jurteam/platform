import React from "react";
import { SearchIcon } from "../Icons/SearchIcon";

export const FormSearch = ( props ) => {
  const { value, onChange } = props;
  return (
    <div className="jur-form jur-form__search">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
      />
      <SearchIcon />
    </div>
  );
};
