import React from "react";

import * as ReactTimeAgo from "react-timeago";

export const TimeAgo = ( props ) => {
  const date = props.date;
  let transformedDate = "";
  const parsedDate = Date.parse(date);
  const now = Date.parse(new Date());
  const diff = now - parsedDate;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const minutesLimit = minute * 5; // 5 minute
  const hoursLimit = minute * 24; // 24 hours
  const daysLimit = minute * 2; // 2 days

  if (diff < minutesLimit) {
    transformedDate = "few seconds ago";
  } else if (diff > minute && diff < minutesLimit) {
    transformedDate = "few minutes ago";
  } else if (diff > minutesLimit && diff < hoursLimit) {
    transformedDate = "few hours ago";
  } else {
    transformedDate = "few days ago";
  }

  return <span>{transformedDate}</span>;
  // return (<span><ReactTimeAgo date={date} /></span>);
};
