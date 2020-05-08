import React, { useEffect } from "react";
import "./OathTakersTable.scss";

import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import { SpinnerOnly } from "JurCommon/Spinner";
import { OATH_KEEPER_FETCH_OATH_TAKERS } from "../../../../reducers/types";

const OathTakerTableHeaderRow = ({ onSort }) => (
  <Table.Row>
    <Table.Cell>Rank</Table.Cell>
    <Table.Cell>Address</Table.Cell>
    <Table.Cell>Amount</Table.Cell>
    <Table.Cell>Oath Count</Table.Cell>
  </Table.Row>
);

const OathTakerTableRow = ({ rank, address, amount, oathCount }) => (
  <Table.Row>
    <Table.Cell>{rank}</Table.Cell>
    <Table.Cell>{address}</Table.Cell>
    <Table.Cell>
      <Amount value={amount} />
    </Table.Cell>
    <Table.Cell>{oathCount}</Table.Cell>
  </Table.Row>
);

const OathTakersTable = ({ rows, fetchOathTakers, onSortChange }) => {
  useEffect(() => {
    fetchOathTakers();
  }, []);

  return (
    <Table>
      <Table.Head>
        <OathTakerTableHeaderRow onSort={onSortChange} />
      </Table.Head>
      <Table.Body>
        {rows.map((r, index) => (
          <OathTakerTableRow key={`${r.id}-${index}`} {...r.attributes} />
        ))}
      </Table.Body>
    </Table>
  );
};

OathTakersTable.defaultProps = {
  rows: []
};

const fetchOathTakers = () => ({ type: OATH_KEEPER_FETCH_OATH_TAKERS });

const mapStateToProps = state => ({
  rows: state.oathKeeper.oathTakers,
  isLoading: state.oathKeeper.isFetchingOathTakers
});

const mapDispatchToProps = { fetchOathTakers };

export default global.connection(
  OathTakersTable,
  mapStateToProps,
  mapDispatchToProps
);
