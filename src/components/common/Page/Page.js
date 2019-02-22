import React from "react";
import PropTypes from "prop-types";

import "./Page.scss"; // style

export const Page = ({ children }) => (
  <div className="jur-page">{children}</div>
);
