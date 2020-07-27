import React from "react";
import { SearchIcon } from "../Icons/SearchIcon";
import { mapLabelsToProps } from "../../../utils/helpers";

const FormSearchPure = ({ value, onChange, className = "", labels }) => {
  return (
    <div className={`jur-form jur-form__search ${className}`}>
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={labels.search}
      />
      <SearchIcon />
    </div>
  );
};

export const FormSearch = global.connection(FormSearchPure, mapLabelsToProps);
