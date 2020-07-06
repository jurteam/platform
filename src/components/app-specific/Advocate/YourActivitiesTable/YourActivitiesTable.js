import React, { useEffect } from "react";
import "./YourActivitiesTable.scss";
import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import YourActivitiesAction from "../YourActivitiesAction";
import { getAdvocateYourActivities } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_YOUR_ACTIVITIES } from "../../../../reducers/types";
import { i18nDateFormat } from "../../../../utils/helpers";

const YourActivitiesTable = ({ rows, fetchYourActivities }) => {
  useEffect(() => {
    fetchYourActivities();
  }, []);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Activity</Table.Cell>
          <Table.Cell>Reward</Table.Cell>
          <Table.Cell>Due Date</Table.Cell>
          <Table.Cell>Status</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map(r => (
          <Table.Row key={r.id}>
            <Table.Cell>{r.attributes.name}</Table.Cell>
            <Table.Cell>
              <Amount value={r.attributes.rewardAmount} />
            </Table.Cell>
            <Table.Cell>{i18nDateFormat(r.attributes.dueDate)}</Table.Cell>
            <Table.Cell>
              <YourActivitiesAction activity={r} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

YourActivitiesTable.defaultProps = {
  rows: []
};

const mapStateToProps = state => ({
  rows: getAdvocateYourActivities(state)
});

const fetchYourActivities = () => ({ type: ADVOCATE_FETCH_YOUR_ACTIVITIES });
const mapDispatchToProps = { fetchYourActivities };

export default global.connection(
  YourActivitiesTable,
  mapStateToProps,
  mapDispatchToProps
);
