import React from "react";
import PropTypes from "prop-types";
import Activity from "../Activity";

import "./ActivityList.scss";

export const ActivityList = ({activities}) => {
  const filteredAcivities = activities.reduce((acc, activity) => {
    activity.readed ? acc.old.push(activity) : acc.new.push(activity);
    return acc;
  }, {old: [], new: []});
  console.log(filteredAcivities);
  return (
    <ul className="jur-activity-list">
      {filteredAcivities.old.map(activity => (
        <li className="jur-activity-list__item">
          <Activity data={activity} />
        </li>
      ))}
      {filteredAcivities.new.length > 0 &&
        <>
          <li className="jur-activity-list__new">New</li>
          {filteredAcivities.new.map(activity => (
            <li className="jur-activity-list__item">
              <Activity data={activity} />
            </li>
          ))}
        </>
      }
    </ul>
  );
};