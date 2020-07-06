import React, { useEffect } from "react";
import "./RewardsTable.scss";
import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import RewardAction from "../RewardsAction";
import { JurIcon } from "JurCommon/Icons";
import { getAdvocateRewards } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_REWARDS } from "../../../../reducers/types";
import { i18nDateFormat } from "../../../../utils/helpers";

const RewardsTable = ({ rows, fetchRewards }) => {
  useEffect(() => {
    fetchRewards();
  }, []);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Activity</Table.Cell>
          <Table.Cell>Reward</Table.Cell>
          <Table.Cell>Date</Table.Cell>
          <Table.Cell>Credited On</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map(r => (
          <Table.Row key={r.id}>
            <Table.Cell>
              <JurIcon className="jur-icon-table-fix" circle={true} />
            </Table.Cell>
            <Table.Cell>{r.attributes.name}</Table.Cell>
            <Table.Cell>
              <Amount value={r.attributes.rewardAmount} />
            </Table.Cell>
            <Table.Cell>{i18nDateFormat(r.attributes.dueDate)}</Table.Cell>
            <Table.Cell>
              <RewardAction activity={r} />
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

const fetchRewards = () => ({ type: ADVOCATE_FETCH_REWARDS });
const mapDispatchToProps = { fetchRewards };

export default global.connection(
  RewardsTable,
  mapStateToProps,
  mapDispatchToProps
);
