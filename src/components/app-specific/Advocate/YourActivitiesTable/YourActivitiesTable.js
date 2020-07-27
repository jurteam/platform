import React, { useEffect } from "react";
import "./YourActivitiesTable.scss";
import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import YourActivitiesAction from "../YourActivitiesAction";
import {
  getAdvocateYourActivities,
  getLabels
} from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_YOUR_ACTIVITIES } from "../../../../reducers/types";
import { i18nDateFormatSec } from "../../../../utils/helpers";

const YourActivitiesTable = ({ rows, fetchYourActivities, labels }) => {
  useEffect(() => {
    fetchYourActivities();
  }, []);

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>{labels.activity}</Table.Cell>
          <Table.Cell size="small">{labels.reward}</Table.Cell>
          <Table.Cell size="small">{labels.dueDate}</Table.Cell>
          <Table.Cell size="small">{labels.status}</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map(r => (
          <Table.Row key={r.id}>
            <Table.Cell>{r.attributes.name}</Table.Cell>
            <Table.Cell>
              <Amount value={r.attributes.rewardAmount} />
            </Table.Cell>
            <Table.Cell>{i18nDateFormatSec(r.attributes.dueDate)}</Table.Cell>
            <Table.Cell>
              <YourActivitiesAction activity={r.attributes} />
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
  rows: getAdvocateYourActivities(state),
  labels: getLabels(state)
});

const fetchYourActivities = () => ({ type: ADVOCATE_FETCH_YOUR_ACTIVITIES });
const mapDispatchToProps = { fetchYourActivities };

export default global.connection(
  YourActivitiesTable,
  mapStateToProps,
  mapDispatchToProps
);
