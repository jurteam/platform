import React from "react";
import "./OathTakersTable.scss";

import Table from "JurCommon/Table";
import { SpinnerOnly } from "JurCommon/Spinner";

const OathTakerTableHeaderRow = ({ onSort }) => (
  <>
    <Table.Cell>Rank</Table.Cell>
    <Table.Cell>Address</Table.Cell>
    <Table.Cell>Amount</Table.Cell>
    <Table.Cell>Oath Count</Table.Cell>
  </>
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

const OathTakersTable = ({ rows, isLoading, onSortChange }) => (
  <Table>
    <TableHead>
      <OathTakerTableHeaderRow onSort={onSortChange} />
    </TableHead>
    <TableBody>
      {isLoading ? (
        <SpinnerOnly loading={isLoading} />
      ) : (
        rows.map(r => <OathTakerTableRow key={r.address} {...r} />)
      )}
    </TableBody>
  </Table>
);

OathTakersTable.defaultProps = {
  rows: []
};

export default OathTakersTable;
