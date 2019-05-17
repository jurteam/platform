import React from "react";
import Avatar from "../Avatar";
import PropTypes from "prop-types";
import "./AvatarChart.scss";

export const AvatarChart = ( props ) => {
  return (
    <div className="jur-avatar-chart">
      <svg viewBox="0 0 36 36" className={props.color}>
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeWidth="2"
          strokeDasharray={`${props.percentage.toString().replace("%", "")}, 100`}
        />
      </svg>
      <Avatar seed={props.seed} size="xlarge" variant="circle" />
    </div>
  );
};

AvatarChart.propTypes = {
  seed: PropTypes.string.isRequired,
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  color: PropTypes.oneOf(["green", "blue"]).isRequired
};
