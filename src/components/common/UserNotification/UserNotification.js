import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import TimeAgo from "react-timeago";
import Tag from "../Tag";
import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Dropdown from "../Dropown";
import DropdownItem from "../DropdownItem";
import { EllipsisVIcon } from "../Icons/EllipsisVIcon";

import "./UserNotification.scss";

import { AppContext } from "../../../bootstrap/AppProvider"; // context
import Activity from "../Activity";

import { READ_ACTIVITY } from "../../../reducers/types";

export const UserNotification = ({ user, history, className }) => {
  const { labels, notificationsTableHeaders: headers } = useContext(AppContext);
  const { activities } = user;

  const handleGoTo = to => {
    history.push(to);
  };

  const handleRead = activityId => {
    global.drizzle.store.dispatch({
      type: READ_ACTIVITY,
      activityId
    });
  };

  return (
    <div className={`jur-user-notification ${className || ""}`} key="user-notification-list">
      <h3>{labels.notifications}</h3>
      <Table className="jur-user-notification__table">
        <TableHead>
          <TableRow
              key="uactivity-head">
            {headers.map(header => (
              <TableCell
                key={header.label.toString()}
                {...header.sortable && { onClick: header.sortable }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map(activity => (
            <TableRow
              key={`uactivity-${activity.id}${activity.readed ? '' : '-new'}`}
              className="jur-user-notification__table__row"
            >
              <TableCell
                key={`uactivity-${activity.id}-status`}
              >
                {!activity.readed && <Tag statusId={0}>{labels.new}</Tag>}
              </TableCell>
              <TableCell
                key={`uactivity-${activity.id}-date`}
              >
                <TimeAgo date={activity.date} />
              </TableCell>
              <TableCell
                key={`uactivity-${activity.id}-activity`}>
                <Activity data={activity} hideTime={true} />
              </TableCell>
              <TableCell
                key={`uactivity-${activity.id}-opt`}>
                <Dropdown label={<EllipsisVIcon />}>
                  <DropdownItem
                    onClick={() =>
                      handleGoTo(`/contracts/detail/${activity.contract}`)
                    }
                  >
                    {labels.goToContract}
                  </DropdownItem>
                  {!activity.readed && (
                    <DropdownItem onClick={() => handleRead(activity.id)}>
                      {labels.markAsRead}
                    </DropdownItem>
                  )}
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
