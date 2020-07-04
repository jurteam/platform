import React from "react";
import "./YourActivitiesAction.scss";
const YourActivitiesAction = ({ activity }) => (
  <span>{activity.attributes.state}</span>
);
export default YourActivitiesAction;
