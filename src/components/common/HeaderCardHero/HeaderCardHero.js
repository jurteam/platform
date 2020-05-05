import React from "react";
import PropTypes from "prop-types";

import "./HeaderCardHero.scss";

const HeaderCardHero = ({ children }) => (
  <div className="jur-header-card-hero">{children}</div>
);

HeaderCardHero.propTypes = {
  children: PropTypes.node.isRequired
};

export default HeaderCardHero;
