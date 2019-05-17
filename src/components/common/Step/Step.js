import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const Step = ( props ) => {
  const { active, children } = props;
  return (
    <Fragment>
    {active ? (
      <div className={`jur-step ${active ? "jur-step--active" : ""}`}>
        {children}
      </div>
    ) : null}
  </Fragment>
  );
};

Step.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node
};
