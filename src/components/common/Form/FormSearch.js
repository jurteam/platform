import React from "react";
import { SearchIcon } from "../Icons/SearchIcon";

export const FormSearch = ({ value, onChange, className = "" }) => {
  return (
    <div className={`jur-form jur-form__search ${className}`}>
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search..."
      />
      <SearchIcon />
    </div>
  );
};
