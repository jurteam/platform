import React from "react";
import "./AdvocatesTable.scss";

import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import AvatarInfo from "JurCommon/AvatarInfo";
import StatusBadge from "../StatusBadge";
import ViewAdvocateButton from "../ViewAdvocateButton";
import { ADVOCATE_FETCH_ALL } from "../../../../reducers/types";
import { orderTosign } from "JurUtils/helpers";
import { mapLabelsToProps } from "../../../../utils/helpers";

const AdvocatesTable = ({ advocates, onSort, size, labels }) => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>{labels.wallet}</Table.Cell>
        <Table.Cell size={size === "compact" ? "small" : null}>
          {labels.type}
        </Table.Cell>
        <Table.Cell
          onClick={onSort}
          fieldName="TotalEarned"
          size={size === "compact" ? "small" : "medium"}
        >
          {labels.totalEarned}
        </Table.Cell>
        <Table.Cell size={size === "compact" ? "xsmall" : null}>
          {labels.action}
        </Table.Cell>
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

const onSort = (field, order) => {
  const sortBy = orderTosign(order, field);
  return { type: ADVOCATE_FETCH_ALL, payload: { sortBy } };
};

AdvocatesTable.defaultProps = {
  advocates: []
};

const mapDispatchToProps = { onSort };

export default global.connection(
  AdvocatesTable,
  mapLabelsToProps,
  mapDispatchToProps
);
