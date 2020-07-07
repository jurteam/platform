import React from "react";
import "./AdvocatesTable.scss";

import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import AvatarInfo from "JurCommon/AvatarInfo";
import StatusBadge from "../StatusBadge";
import ViewAdvocateButton from "../ViewAdvocateButton";

const AdvocatesTable = ({ advocates }) => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Wallet</Table.Cell>
        <Table.Cell>Type</Table.Cell>
        <Table.Cell>Total Earned</Table.Cell>
        <Table.Cell>Action</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {advocates.map(h => (
        <Table.Row key={h.id}>
          <Table.Cell>
            <AvatarInfo userWallet={h.attributes.address} size="small" />
          </Table.Cell>
          <Table.Cell>
            <StatusBadge statusType="Normal" />
          </Table.Cell>
          <Table.Cell>
            <Amount value={h.attributes.totalEarned} />
          </Table.Cell>
          <Table.Cell>
            <ViewAdvocateButton address={h.attributes.address} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

AdvocatesTable.defaultProps = {
  advocates: []
};

export default AdvocatesTable;
