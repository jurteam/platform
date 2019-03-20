import React from "react";
import PropTypes from "prop-types";

import "./ModalFooter.scss";

export const ModalFooter = ({ children, className }) => (
  <div className={`jur-modal__footer ${className || ""}`}>{children}</div>
);

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
