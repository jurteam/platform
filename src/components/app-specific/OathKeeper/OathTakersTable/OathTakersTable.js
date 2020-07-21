import React, { useEffect } from "react";
import "./OathTakersTable.scss";

import Table from "JurCommon/Table";
import Box from "JurCommon/Box";
import Amount from "JurCommon/Amount";
import AvatarInfo from "JurCommon/AvatarInfo";
import {
  OATH_KEEPER_FETCH_OATH_TAKERS,
  OATH_KEEPER_SELECT_ROW,
  OATH_KEEPER_FETCH_OATHS_OF
} from "../../../../reducers/types";
import RankBadge from "JurCommon/RankBadge";
import { i18nDateFormat, oathState } from "../../../../utils/helpers";
import { TableCell } from "../../../common/TableCell/TableCell";

const OathTakerTableHeaderRow = ({ onSort, ...rest }) => (
  <Table.Row {...rest}>
    <Table.Cell align="center" onClick={onSort} fieldName="Rank">
      Rank
    </Table.Cell>
    <Table.Cell>Wallet</Table.Cell>
    <Table.Cell onClick={onSort} fieldName="Amount" size="medium">
      Amount Staked
    </Table.Cell>
    <Table.Cell onClick={onSort} fieldName="OathCount" size="small">
      Oaths
    </Table.Cell>
    <Table.Cell size="small">Amount</Table.Cell>
    <Table.Cell size="small">Oath Date</Table.Cell>
    <Table.Cell size="small">Duration</Table.Cell>
    <Table.Cell size="small">Unlock Date</Table.Cell>
  </Table.Row>
);

const OathDetailCell = ({ oaths, property }) => (
  <TableCell>
    <Table>
      <Table.Body>
        {oaths.map((c, index) => (
          <Table.Row key={index}>
            <Table.Cell className="jur-oath-taker-subtable-cell">
              {property(c)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </TableCell>
);

const OathDetailsRow = ({ address, fetchOathsOf, oaths = [] }) => {
  useEffect(() => {
    fetchOathsOf(address);
  }, [address]);

  const activeOaths = oaths.filter(o => oathState(o).isActive());

  return activeOaths.length ? (
    <>
      <OathDetailCell
        oaths={activeOaths}
        property={o => <Amount value={o.amount} />}
      />
      <OathDetailCell
        oaths={activeOaths}
        property={o => i18nDateFormat(Number(o.startAt) * 1000)}
      />
      <OathDetailCell oaths={activeOaths} property={o => o.lockInPeriod} />
      <OathDetailCell
        oaths={activeOaths}
        property={o => i18nDateFormat(Number(o.releaseAt) * 1000)}
      />
    </>
  ) : (
    <>
      <Table.Cell />
      <Table.Cell>{oaths.length ? "No active oaths" : "Loading..."}</Table.Cell>
      <Table.Cell />
      <Table.Cell />
    </>
  );
};

const OathTakerTableRow = ({
  rank,
  address,
  amount,
  oathCount,
  oaths,
  isSelected,
  onClick,
  fetchOathsOf
}) => (
  <Table.Row
    onClick={onClick}
    className={
      isSelected
        ? "jur-oath-takers-row jur-oath-takers-row__selected"
        : "jur-oath-takers-row"
    }
  >
    <Table.Cell align="center">
      <RankBadge rank={rank} />
    </Table.Cell>
    <Table.Cell>
      <AvatarInfo userWallet={address} size="small" />
    </Table.Cell>
    <Table.Cell>
      <Amount value={amount} />
    </Table.Cell>
    <Table.Cell>{oathCount}</Table.Cell>
    {isSelected ? (
      <OathDetailsRow
        fetchOathsOf={fetchOathsOf}
        oaths={oaths}
        address={address}
      />
    ) : (
      <>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
      </>
    )}
  </Table.Row>
);

const OathTakersTable = ({
  rows,
  fetchOathTakers,
  onSortChange,
  selected,
  selectRow,
  fetchOathsOf
}) => {
  useEffect(() => {
    fetchOathTakers();
  }, []);

  return (
    <Table className="jur-safe-margin">
      <Table.Head>
        <OathTakerTableHeaderRow onSort={onSortChange} />
      </Table.Head>
      <Table.Body>
        {rows.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={8}>
              <Box type="message">No oath takers to show</Box>
            </Table.Cell>
          </Table.Row>
        ) : (
          rows.map((r, index) => (
            <OathTakerTableRow
              fetchOathsOf={fetchOathsOf}
              key={`${r.id}-${index}`}
              isSelected={selected === r.id}
              onClick={() => selectRow(r.id)}
              oaths={r.oaths}
              {...r.attributes}
            />
          ))
        )}
      </Table.Body>
    </Table>
  );
};

OathTakersTable.defaultProps = {
  rows: []
};

const fetchOathTakers = () => ({ type: OATH_KEEPER_FETCH_OATH_TAKERS });

const fetchOathsOf = address => ({
  type: OATH_KEEPER_FETCH_OATHS_OF,
  payload: address
});

const orderTosign = order => {
  switch (order) {
    case 1:
      return "+";
    case 2:
      return "-";
    default:
      return "";
  }
};

const onSortChange = (field, order) => {
  const sign = orderTosign(order);
  const sortBy = sign ? sign + field : "";
  return { type: OATH_KEEPER_FETCH_OATH_TAKERS, payload: { sortBy } };
};

const selectRow = id => ({ type: OATH_KEEPER_SELECT_ROW, payload: id });

const mapStateToProps = state => ({
  rows: state.oathKeeper.oathTakers,
  isLoading: state.oathKeeper.isFetchingOathTakers,
  selected: state.oathKeeper.selectedRow
});

const mapDispatchToProps = {
  fetchOathTakers,
  selectRow,
  fetchOathsOf,
  onSortChange
};

export default global.connection(
  OathTakersTable,
  mapStateToProps,
  mapDispatchToProps
);
