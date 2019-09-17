import React, { useState, useContext } from "react";
import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Tag from "../Tag";
import Countdown from "../Countdown";
import AvatarInfo from "../AvatarInfo";
import Dropdown from "../Dropown";
import DropdownItem from "../DropdownItem";
import { EllipsisVIcon } from "../Icons/EllipsisVIcon";
import Button from "../Button";
import Amount from "../Amount";
import ContractsFilters from "../ContractsFilters";
import Pagination from "../Pagination";
import { SpinnerOnly } from "../Spinner";

import { humanToEth, getContractTotalValue } from "../../../utils/helpers"; // log helper

import { EXPIRED_CONTRACT } from "../../../reducers/types";

import "./ContractsTable.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractsTable = props => {
  const {
    headers,
    filters,
    data,
    searching,
    handleArchive,
    filtersDisabled,
    handleFilterChange,
    handleFilterSubmit,
    newContract,
    initialPage,
    onPageChange,
    onSortChange,
    contractsPerPage,
    totalContracts,
    loading,
    user,
    history
  } = props;
  const [activePage, setActivePage] = useState(initialPage);
  const { labels, archivableCodes } = useContext(AppContext);

  const emptyMessage = data.length === 0 && (
    <div className="jur-table__empty">
      {
        searching === false ? (
        <>
          <p>{labels.anyContract}</p>
          <Button variant="gradient" onClick={newContract}>
            {labels.createYourFirstContract}
          </Button>
        </>
      ) : (
        <p>{labels.noContractMatch}</p>
      )}
    </div>
  );

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };

  const handleSortChange = (field,order) => {

    // 0 - no order - no arrow
    // 1 - asc - down arrow
    // 2 - desc - up arrow

    order = order === 1 ? 'asc' : order === 2 ? 'desc' : '';

    onSortChange(field,order);
  };

  const showContract = to => {
    history.push(to);
  };

  const onExpire = id => {
    global.drizzle.store.dispatch({
      type: EXPIRED_CONTRACT,
      id
    });
  };

  const showContractName = contract => {
    if (!contract.contractName) {
      return (
        <span className="empty-placeholder">
          {labels.noContractName
            .replace(
              "%partA%",
              contract.counterparties[0].renderName
                ? contract.counterparties[0].name
                : contract.counterparties[0].wallet
            )
            .replace(
              "%partB%",
              contract.counterparties[1].renderName
                ? contract.counterparties[1].name
                : contract.counterparties[1].wallet
            )}
        </span>
      );
    }

    return contract.contractName;
  };

  return (
    <div className="jur-contracts__table">
      <ContractsFilters
        onChange={handleFilterChange}
        onSubmit={handleFilterSubmit}
        disabled={filtersDisabled}
        {...filters}
      />
      <Table key="contractsTable">
        <TableHead>
          <TableRow key="contractsTableHead">
            {headers.map((header, idx) => (
              <TableCell
                key={`thead-${idx}-${header.label.toString()}`}
                {...header.sortable && { onClick: handleSortChange, fieldName: header.fieldName }}
                {...header.className && { className: header.className }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.length > 0 && loading === false ? (
          <TableBody>
            {data.map((contract, idx) => (
              <TableRow
                key={`notification-row-${idx}-${contract.id}`}
                onClick={() => showContract(`/contracts/detail/${contract.id}`)}
              >
                <TableCell>
                  <Tag statusId={contract.statusId}>{contract.statusLabel}</Tag>
                </TableCell>
                <TableCell>{showContractName(contract)}</TableCell>
                <TableCell>
                  <Countdown
                    days={contract.duration.days}
                    hours={contract.duration.hours}
                    minutes={contract.duration.minutes}
                    statusId={contract.statusId}
                    startDate={contract.statusUpdatedAt}
                    onExpire={() => onExpire(contract.id)}
                    expireAlertFrom={
                      process.env.REACT_APP_CONTRACT_EXPIRE_ALERT
                    }
                  />
                </TableCell>
                <TableCell>
                  {contract.counterparties.map(counterParty => (
                    <AvatarInfo
                      key={counterParty.wallet}
                      userName={counterParty.name}
                      userWallet={counterParty.wallet.toLowerCase()}
                      shouldRenderName={counterParty.shouldRenderName}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Amount value={humanToEth(getContractTotalValue(contract, true))} />
                </TableCell>
                <TableCell>
                  {!contract.archived &&
                  contract.counterparties[0].wallet.toLowerCase() ===
                    user.wallet.toLowerCase() &&
                  archivableCodes.indexOf(contract.statusId) >= 0 ? (
                    <Dropdown label={<EllipsisVIcon />}>
                      <DropdownItem onClick={() => handleArchive(contract.id)}>
                        {labels.archive}
                      </DropdownItem>
                    </Dropdown>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
      {data.length > 0 && loading === true && (
        <SpinnerOnly loading={loading} className={"table__loading"} />
      )}
      {data.length > 0 && (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={contractsPerPage}
          totalItemsCount={totalContracts}
          handlePageChange={handlePageChange}
          // getPageUrl={(i) => "https://customLink/#" + i}
        />
      )}
      {emptyMessage}
    </div>
  );
};
