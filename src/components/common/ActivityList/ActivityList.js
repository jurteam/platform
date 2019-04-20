import React, { useContext } from "react";
import PropTypes from "prop-types";
import Activity from "../Activity";

import "./ActivityList.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ActivityList = ({ activities }) => {
  const { labels } = useContext(AppContext);
  if (activities.length) {
    const filteredAcivities = activities.reduce(
      (acc, activity) => {
        activity.readed ? acc.old.push(activity) : acc.new.push(activity);
        return acc;
      },
      { old: [], new: [] }
    );
    return (
      <ul className="jur-activity-list">
        {filteredAcivities.old.map((activity, idx) => (
          <li className="jur-activity-list__item" key={`old-${idx}`}>
            <Activity data={activity} />
          </li>
        ))}
        {filteredAcivities.new.length > 0 && (
          <>
            <li className="jur-activity-list__new">{labels.new}</li>
            {filteredAcivities.new.map((activity, idx) => (
              <li className="jur-activity-list__item" key={`new-${idx}`}>
                <Activity data={activity} />
              </li>
            ))}
          </>
        )}
      </ul>
    );
  } else {
    return (
      <ul className="jur-activity-list jur-activity-list__none">
        <li>
          <span>{labels.noActivities}</span>
        </li>
      </ul>
    );
  }
};
