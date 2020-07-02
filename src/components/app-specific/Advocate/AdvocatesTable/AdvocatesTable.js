import React from "react";
import "./AdvocatesTable.scss";

import Table from "JurCommon/Table";
import AvatarInfo from "JurCommon/AvatarInfo";
import StatusBadge from "../StatusBadge";
import ViewStatusButton from "../ViewStatusButton";

const AdvocatesTable = ({ advocates }) => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Wallet</Table.Cell>
        <Table.Cell>Status</Table.Cell>
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
            <StatusBadge statusType={h.attributes.statusType} />
          </Table.Cell>
          <Table.Cell>
            <ViewStatusButton address={h.attributes.address} />
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
