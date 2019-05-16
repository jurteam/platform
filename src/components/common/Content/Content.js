import React from "react";
import PropTypes from "prop-types";

import "./Content.scss";

export const Content = props => (
  <div className="jur-content">{props.children}</div>
);
