import React from "react";
import PropTypes from "prop-types";

import "./ModalFooter.scss";

export const ModalFooter = ( props ) => {
  const { children, className } = props;
  return (<div className={`jur-modal__footer ${className || ""}`}>{children}</div>);
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
