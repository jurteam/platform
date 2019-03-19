import React from "react";
import { SearchIcon } from "../Icons/SearchIcon";

export const FormSearch = ({ children, value, onChange }) => (
  <div className="jur-form jur-form__search">
    <input
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search..."
    />
    <SearchIcon />
  </div>
);
