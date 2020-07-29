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
import { orderTosign } from "JurUtils/helpers";
import { TableCell } from "../../../common/TableCell/TableCell";
import { getLabels } from "../../../../sagas/Selectors";

const OathTakerTableHeaderRow = ({ onSort, labels, ...rest }) => (
  <Table.Row {...rest}>
    <Table.Cell align="center" onClick={onSort} fieldName="Rank" size="xsmall">
      {labels.rank}
    </Table.Cell>
    <Table.Cell>{labels.wallet}</Table.Cell>
    <Table.Cell onClick={onSort} fieldName="Amount" size="medium">
      {labels.amountStaked}
    </Table.Cell>
    <Table.Cell onClick={onSort} fieldName="OathCount" size="small">
      {labels.oaths}
    </Table.Cell>
    <Table.Cell size="small">{labels.amount}</Table.Cell>
    <Table.Cell size="small">{labels.oathDate}</Table.Cell>
    <Table.Cell size="small">{labels.duration}</Table.Cell>
    <Table.Cell size="small">{labels.unlockDate}</Table.Cell>
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

const OathDetailsRow = ({ address, fetchOathsOf, oaths = [], labels }) => {
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
      <Table.Cell>
        {oaths.length ? labels.noActiveOaths : labels.loading}
      </Table.Cell>
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
  fetchOathsOf,
  labels
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
        labels={labels}
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
  fetchOathsOf,
  labels
}) => {
  useEffect(() => {
    fetchOathTakers();
  }, []);

  return (
    <Table className="jur-safe-margin">
      <Table.Head>
        <OathTakerTableHeaderRow onSort={onSortChange} labels={labels} />
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
              labels={labels}
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

const onSortChange = (field, order) => {
  const sortBy = orderTosign(order, field);
  return { type: OATH_KEEPER_FETCH_OATH_TAKERS, payload: { sortBy } };
};

const selectRow = id => ({ type: OATH_KEEPER_SELECT_ROW, payload: id });

const mapStateToProps = state => ({
  rows: state.oathKeeper.oathTakers,
  isLoading: state.oathKeeper.isFetchingOathTakers,
  selected: state.oathKeeper.selectedRow,
  labels: getLabels(state)
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
