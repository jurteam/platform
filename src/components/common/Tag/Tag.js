import React from "react";
import PropTypes from "prop-types";
import "./Tag.scss";

export const Tag = ({ statusId, children }) => {
  return (
    <div className={`jur-tag jur-tag--${statusId}`}>
      <span>{children}</span>
    </div>
  );
};

Tag.propTypes = {
  statusId: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};
