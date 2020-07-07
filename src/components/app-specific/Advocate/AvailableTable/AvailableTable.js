import React, { useEffect } from "react";
import "./AvailableTable.scss";
import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import { colorSlots } from "JurUtils/AdvocateHelpers";
import { getAdvocateAvailable } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_AVAILABLE } from "../../../../reducers/types";

const AvailableTable = ({ rows, fetchAvailable }) => {
  useEffect(() => {
    fetchAvailable();
  }, []);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Activity</Table.Cell>
          <Table.Cell>Reward</Table.Cell>
          <Table.Cell>Slots</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
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
  rows: getAdvocateAvailable(state)
});

const fetchAvailable = () => ({ type: ADVOCATE_FETCH_AVAILABLE });
const mapDispatchToProps = { fetchAvailable };

export default global.connection(
  AvailableTable,
  mapStateToProps,
  mapDispatchToProps
);
