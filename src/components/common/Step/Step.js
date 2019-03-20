import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const Step = ({ index, last, active, children }) => (
  <Fragment>
    {active ? (
      <div className={`jur-step ${active ? "jur-step--active" : ""}`}>
        {children}
      </div>
    ) : null}
  </Fragment>
);

Step.propTypes = {
  index: PropTypes.number,
  last: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node
};
