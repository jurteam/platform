import React from "react";
import PropTypes from "prop-types";

import "./FileList.scss";

export const FileList = ({ children }) => (
  <ul className="jur-file-list">{children}</ul>
);
