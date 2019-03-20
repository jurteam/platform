import React from "react";
import PropTypes from "prop-types";

import "./ModalBody.scss";

export const ModalBody = ({ children, className, dangerouslySetInnerHTML }) => (
  <div
    className={`jur-modal__content ${className || ""}`}
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
  >
    {children || null}
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
