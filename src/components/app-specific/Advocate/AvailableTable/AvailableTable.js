import React, { useEffect } from "react";
import "./AvailableTable.scss";
import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import { colorSlots } from "JurUtils/AdvocateHelpers";
import { getAdvocateAvailable, getLabels } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_AVAILABLE } from "../../../../reducers/types";
import EmptyMessage from "./EmptyMessage";

const AvailableTable = ({ rows, fetchAvailable, labels }) => {
  useEffect(() => {
    fetchAvailable();
  }, []);

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>{labels.activity}</Table.Cell>
          <Table.Cell size="small">{labels.reward}</Table.Cell>
          <Table.Cell size="small">{labels.slots}</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <EmptyMessage isShown={!rows.length} />
        {rows.map(r => (
          <Table.Row key={r.id}>
            <Table.Cell>{r.attributes.name}</Table.Cell>
            <Table.Cell>
              <Amount value={r.attributes.rewardAmount} />
            </Table.Cell>
            <Table.Cell
              className={colorSlots(
                r.attributes.slotAssigned,
                r.attributes.slotTotal
              )}
            >
              {r.attributes.slotAssigned} of {r.attributes.slotTotal}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

AvailableTable.defaultProps = {
  rows: []
};

const mapStateToProps = state => ({
  rows: getAdvocateAvailable(state),
  labels: getLabels(state)
});

const fetchAvailable = () => ({ type: ADVOCATE_FETCH_AVAILABLE });
const mapDispatchToProps = { fetchAvailable };

export default global.connection(
  AvailableTable,
  mapStateToProps,
  mapDispatchToProps
);
