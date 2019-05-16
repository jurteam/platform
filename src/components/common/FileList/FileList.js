import React from "react";
import PropTypes from "prop-types";

import "./FileList.scss";

export const FileList = props => (
  <ul className="jur-file-list">{props.children}</ul>
);
