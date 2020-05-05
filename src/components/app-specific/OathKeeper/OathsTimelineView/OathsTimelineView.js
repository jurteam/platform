import React from "react";
import "./OathsTimelineView.scss";

import Table from "JurCommon/Table";
import TimeAgo from "JurCommon/TimeAgo";
import Amount from "JurCommon/Amount";
import StatusAction from "../StatusAction";

const OathsTimelineView = ({ oaths }) => (
  <Table>
    <Table.Body>
      {oaths.map(oath => (
        <Table.Row key={oath.oathIndex}>
          <Table.Cell align="left" className="jur-timeline-cell">
            Staked <Amount value={oath.amount} />
          </Table.Cell>
          <Table.Cell align="left">for {oath.lockInPeriod} months</Table.Cell>
          <Table.Cell align="left">
            <TimeAgo value={oath.startAt} />
          </Table.Cell>
          <Table.Cell align="right">
            <StatusAction oath={oath} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

OathsTimelineView.defaultProps = {
  oaths: []
};

export default OathsTimelineView;
