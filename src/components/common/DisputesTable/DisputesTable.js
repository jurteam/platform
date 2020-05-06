import React, { useContext, useState } from "react";

import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Tag from "../Tag";
import Countdown from "../Countdown";
import Amount from "../Amount";

import Dropdown from "../Dropdown";
import DropdownItem from "../DropdownItem";
import { EllipsisVIcon } from "../Icons/EllipsisVIcon";

import { Link, withRouter } from "react-router-dom";

import { humanToEth, getContractTotalValue, log } from "../../../utils/helpers"; // log helper
import { EXPIRED_DISPUTE } from "../../../reducers/types";

import "./DisputesTable.scss";
import DisputesFilters from "../DisputesFilters";
import Pagination from "../Pagination";
import { SpinnerOnly } from "../Spinner";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

const DisputesTable = props => {
  const { labels } = useContext(AppContext);

  const {
    headers,
    filters,
    data,
    myDispute,
    handleFilterChange,
    handleFilterSubmit,
    initialPage,
    onPageChange,
    onSortChange,
    disputesPerPage,
    totalDisputes,
    loading,
    // filtersDisabled,
    history
  } = props;

  const [activePage, setActivePage] = useState(initialPage);

  const showDispute = to => {
    history.push(to);
  };

  const handleRedeem = to => {
    history.push(to);
  };

  const emptyDisputesMessage = <p>{labels.noDisputes}</p>;

  const onExpire = id => {
    global.store.dispatch({
      type: EXPIRED_DISPUTE,
      id
    });
  };

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };

  const handleSortChange = (field, order) => {
    // 0 - no order - no arrow
    // 1 - asc - down arrow
    // 2 - desc - up arrow

    order = order === 1 ? "asc" : order === 2 ? "desc" : "";

    onSortChange(field, order);
  };

  const emptyMyDisputesMessage = (
    <>
      <p>{labels.noDisputesParticipation}</p>
      <Link to="/disputes" onClick={() => handleFilterChange("mine", false)}>
        {labels.seeAllDisputes}
      </Link>
    </>
  );

  const renderRecords = data => (
    <TableBody>
      {data.map(dispute => (
        <TableRow
          key={dispute.id}
          onClick={() => showDispute(`/disputes/detail/${dispute.id}`)}
          className={dispute.new ? "updated-dispute-" + dispute.new : ""}
        >
          <TableCell>
            <Tag statusId={dispute.statusId}>{dispute.statusLabel}</Tag>
          </TableCell>
          <TableCell className="jur-disputes__table__dispute-name">
            <div>{dispute.disputeName}</div>
          </TableCell>
          <TableCell>
            <Countdown
              days={dispute.duration.days}
              hours={dispute.duration.hours}
              minutes={dispute.duration.minutes}
              statusId={dispute.statusId}
              startDate={dispute.statusUpdatedAt}
              onExpire={() => onExpire(dispute.id)}
              expireAlertFrom={process.env.REACT_APP_VOTE_EXPIRE_ALERT}
              showSeconds
            />
          </TableCell>
          <TableCell>{dispute.category}</TableCell>
          <TableCell className="jur-disputes__table__contract-value">
            <Amount value={humanToEth(getContractTotalValue(dispute, true))} />
          </TableCell>
          <TableCell className="jur-disputes__table__earning">
            {dispute.totalWithdraw > 0 && (
              <Amount value={dispute.totalWithdraw} />
            )}
          </TableCell>
          {dispute.archived ? (
            <TableCell>
              <Dropdown label={<EllipsisVIcon />}>
                <DropdownItem onClick={() => handleRedeem(dispute.id)}>
                  {labels.redeem}
                </DropdownItem>
              </Dropdown>
            </TableCell>
          ) : null}
        </TableRow>
      ))}
    </TableBody>
  );

  const emptyMessage = data.length === 0 && (
    <div className="jur-table__empty">
      {myDispute ? emptyMyDisputesMessage : emptyDisputesMessage}
    </div>
  );
  return (
    <div className="jur-disputes__table">
      <DisputesFilters
        myDispute={myDispute}
        onChange={handleFilterChange}
        onSubmit={handleFilterSubmit}
        {...filters}
      />
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell
                key={header.label.toString()}
                {...header.sortable && {
                  onClick: handleSortChange,
                  fieldName: header.fieldName
                }}
                {...header.className && { className: header.className }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.length > 0 ? renderRecords(data) : null}
      </Table>
      {data.length > 0 && loading === true && (
        <SpinnerOnly loading={loading} className={"table__loading"} />
      )}
      {data.length > 0 && (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={disputesPerPage}
          totalItemsCount={totalDisputes}
          handlePageChange={handlePageChange}
          getPageUrl={i => "https://customLink/#" + i}
        />
      )}
      {emptyMessage}
    </div>
  );
};

export default withRouter(DisputesTable);
