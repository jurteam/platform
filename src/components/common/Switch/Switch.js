import React, { useContext } from "react";
import "./Switch.scss";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import { upperCaseFirst, log } from "../../../utils/helpers"; // capitalize

export const Switch = props => {
  const { error, value, checked, ...rest } = props;
  const { labels } = useContext(AppContext);

  log("Switch", value);

  return (
    <div className="switch">
      <label className="switch__input">
        <input type="checkbox" checked={checked} value={value} {...rest} />
        <span className="slider" />
      </label>
      <div className="switch__value">
        {checked ? upperCaseFirst(labels.yes) : upperCaseFirst(labels.no)}
      </div>
    </div>
  );
};
