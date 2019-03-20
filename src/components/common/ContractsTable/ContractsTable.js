import React, { useState } from "react";
import PropTypes from "prop-types";
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

import "./ContractsTable.scss";

export const ContractsTable = ({
  headers,
  filters,
  data,
  handleArchive,
  filtersDisabled,
  handleFilterChange,
  handleFilterSubmit,
  newContract,
  initialPage,
  onPageChange,
  contractsPerPage,
  totalContracts,
  history
}) => {
  const [activePage, setActivePage] = useState(initialPage);
  const emptyMessage = data.length === 0 && (
    <div className="jur-table__empty">
      {(filters.status === null && filters.fromDate === null && filters.toDate === null && filters.searchText === null) ? (<>

        <p>It seems you did not create any contract!</p>
      <Button variant="gradient" onClick={newContract}>
        Create your first contract
      </Button></>) : <p>Sorry, no contract match search criteria. Try with another search.</p>}
    </div>
  );

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };

  const showContract = to => {
    history.push(to);
  };


  return (
    <div className="jur-contracts__table">
      <ContractsFilters
        onChange={handleFilterChange}
        onSubmit={handleFilterSubmit}
        disabled={filtersDisabled}
        {...filters}
      />
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell
                key={header.label.toString()}
                {...header.sortable && { onClick: header.sortable }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.length > 0 ? (
          <TableBody>
            {data.map(contract => (
              <TableRow key={contract.id}
              onClick={() => showContract(`/contracts/detail/${contract.id}`)}
              >
                <TableCell>
                  <Tag statusId={contract.statusId}>{contract.statusLabel}</Tag>
                </TableCell>
                <TableCell>{contract.contractName}</TableCell>
                <TableCell>
                  <Countdown
                    duration={contract.duration}
                    expireDate={contract.expireDate}
                  />
                </TableCell>
                <TableCell>
                  {contract.counterparties.map(counterParty => (
                    <AvatarInfo
                      key={counterParty.wallet}
                      userName={counterParty.name}
                      userWallet={counterParty.wallet}
                      shouldRenderName={counterParty.shouldRenderName}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Amount value={contract.value} />
                </TableCell>
                {!contract.archived ? (
                  <TableCell>
                    <Dropdown label={<EllipsisVIcon />}>
                      <DropdownItem onClick={() => handleArchive(contract.id)}>
                        Archive
                      </DropdownItem>
                    </Dropdown>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
      {data.length > 0 &&
        <Pagination
          activePage={activePage}
          itemsCountPerPage={contractsPerPage}
          totalItemsCount={totalContracts}
          handlePageChange={handlePageChange}
          getPageUrl={i => ("https://customLink/#"+i)}
        />
      }
      {emptyMessage}
    </div>
  );
};
