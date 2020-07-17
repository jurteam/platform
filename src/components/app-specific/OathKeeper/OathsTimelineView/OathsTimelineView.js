import React from "react";
import "./OathsTimelineView.scss";

import Table from "JurCommon/Table";
import TimeAgo from "JurCommon/TimeAgo";
import Amount from "JurCommon/Amount";
import StatusAction from "../StatusAction";
import { oathState } from "../../../../utils/helpers";

const OathsTimelineView = ({ oaths }) => {
  const fixClass = oaths.some(o => oathState(o).isCompleted());

  const cellFixClass = fixClass ? "jur-timeline__first-cell-btn-fix" : "";

  const rowFixClass = fixClass ? "jur-timeline__row-btn-fix" : "";

  return (
    <Table className="jur-timeline__table">
      <Table.Body>
        {oaths.map(oath => (
          <Table.Row
            key={oath.oathIndex}
            className={`jur-timeline__row ${rowFixClass}`}
          >
            <Table.Cell
              align="left"
              className={`jur-timeline__first-cell ${cellFixClass}`}
            >
              <span class="jur-timeline__first-cell-content">
                Staked <Amount value={oath.amount} />
              </span>
            </Table.Cell>
            <Table.Cell align="left">for {oath.lockInPeriod} months</Table.Cell>
            <Table.Cell align="left">
              {!oathState(oath).isPending() && !oathState(oath).isFailed() && (
                <TimeAgo date={new Date(Number(oath.startAt) * 1000)} />
              )}
            </Table.Cell>
            <Table.Cell align="center">
              <StatusAction oath={oath} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
OathsTimelineView.defaultProps = {
  oaths: []
};

export default OathsTimelineView;
