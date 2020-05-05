import React from "react";
import PropTypes from "prop-types";

import "./HeaderCardBody.scss";

const HeaderCardBody = ({ children }) => (
  <div className="jur-header-card-body">{children}</div>
);

HeaderCardBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default HeaderCardBody;
