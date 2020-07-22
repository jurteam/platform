import React, { useEffect } from "react";
import "./RewardsTable.scss";
import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import RewardAction from "../RewardsAction";
import { JurIcon } from "JurCommon/Icons";
import { getAdvocateRewards } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_REWARDS } from "../../../../reducers/types";
import { i18nDateFormatSec } from "../../../../utils/helpers";
import EmptyMessage from "./EmptyMessage";

const RewardsTable = ({ rows, address, fetchRewards, isPublic }) => {
  useEffect(() => {
    fetchRewards(address);
  }, []);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell align="center" size="xxsmall" />
          <Table.Cell>Activity</Table.Cell>
          <Table.Cell size="small">Reward</Table.Cell>
          <Table.Cell size="small">Date</Table.Cell>
          <Table.Cell size="small">Credited On</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <EmptyMessage isShown={!rows.length} isPublic={isPublic} />
        {rows.map(r => (
          <Table.Row key={r.id}>
            <Table.Cell>
              <JurIcon className="jur-icon-table-fix" circle={true} />
            </Table.Cell>
            <Table.Cell>{r.attributes.name}</Table.Cell>
            <Table.Cell>
              <Amount value={r.attributes.rewardAmount} />
            </Table.Cell>
            <Table.Cell>{i18nDateFormatSec(r.attributes.dueDate)}</Table.Cell>
            <Table.Cell>
              <RewardAction activity={r.attributes} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

RewardsTable.defaultProps = {
  rows: []
};

const mapStateToProps = state => ({
  rows: getAdvocateRewards(state)
});

const fetchRewards = address => ({
  type: ADVOCATE_FETCH_REWARDS,
  payload: { address }
});
const mapDispatchToProps = { fetchRewards };

export default global.connection(
  RewardsTable,
  mapStateToProps,
  mapDispatchToProps
);
