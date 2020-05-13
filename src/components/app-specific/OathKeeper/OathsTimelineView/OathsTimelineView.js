import React from "react";
import "./OathsTimelineView.scss";

import Table from "JurCommon/Table";
import TimeAgo from "JurCommon/TimeAgo";
import Amount from "JurCommon/Amount";
import StatusAction from "../StatusAction";
import { oathState } from "../../../../utils/helpers";

const OathsTimelineView = ({ oaths }) => (
  <Table>
    <Table.Body>
      {oaths.map(oath => (
        <Table.Row key={oath.oathIndex} className="jur-timeline__row">
          <Table.Cell align="left" className="jur-timeline__first-cell">
            Staked <Amount value={oath.amount} />
          </Table.Cell>
          <Table.Cell align="left">for {oath.lockInPeriod} months</Table.Cell>
          <Table.Cell align="left">
            {!oathState(oath).isPending() && (
              <TimeAgo date={new Date(Number(oath.startAt) * 1000)} />
            )}
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
