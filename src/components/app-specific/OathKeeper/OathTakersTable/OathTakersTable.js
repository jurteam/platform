import React, { useEffect } from "react";
import "./OathTakersTable.scss";

import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import AvatarInfo from "JurCommon/AvatarInfo";
import { OATH_KEEPER_FETCH_OATH_TAKERS } from "../../../../reducers/types";
import RankBadge from "JurCommon/RankBadge";

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
    <Table.Cell>
      <RankBadge rank={rank} />
    </Table.Cell>
    <Table.Cell>
      <AvatarInfo userWallet={address} size="small" />
    </Table.Cell>
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
    <Table className="jur-safe-margin">
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
