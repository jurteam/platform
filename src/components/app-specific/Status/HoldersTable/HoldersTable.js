import React from "react";
import "./HoldersTable.scss";

import Table from "JurCommon/Table";
import AvatarInfo from "JurCommon/AvatarInfo";
import StatusBadge from "../StatusBadge";
import ViewStatusButton from "../ViewStatusButton";

const HoldersTable = ({ holders }) => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Wallet</Table.Cell>
        <Table.Cell>Status</Table.Cell>
        <Table.Cell>Action</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {holders.map(h => (
        <Table.Row key={h.address}>
          <Table.Cell>
            <AvatarInfo userWallet={h.address} size="small" />
          </Table.Cell>
          <Table.Cell>
            <StatusBadge statusType={h.statusType} />
          </Table.Cell>
          <Table.Cell>
            <ViewStatusButton address={h.address} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

HoldersTable.defaultProps = {
  holders: []
};

export default HoldersTable;
