import React, { useContext } from "react";
import PropTypes from "prop-types";
import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Tag from "../Tag";
import Countdown from "../Countdown";
import Amount from "../Amount";

import Dropdown from "../Dropown";
import DropdownItem from "../DropdownItem";
import { EllipsisVIcon } from "../Icons/EllipsisVIcon";

import { Link, withRouter } from "react-router-dom";

import "./DisputesTable.scss";
import DisputesFilters from "../DisputesFilters";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

const DisputesTable = (props) => {

  const { labels } = useContext(AppContext);

  const handleClick = to => {
    props.history.push(to);
  };

  const handleRedeem = to => {
    props.history.push(to);
  };

  const {
    headers,
    data,
    myDispute,
    handleFilterChange,
    handleFilterSubmit
  } = props;

  const emptyDisputesMessage = (
    <p>{labels.noDisputes}</p>
  );

  const emptyMyDisputesMessage = (
    <>
      <p>{labels.noDisputesParticipation}</p>
      <Link to="/disputes" onClick={() => handleFilterChange("mine", false)}>{labels.seeAllDisputes}</Link>
    </>
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
        disabled={data.length <= 0}
      />
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell
                key={header.label.toString()}
                {...header.sortable && { onClick: header.sortable }}
                {...header.className && {className: header.className }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.length > 0 ? (
          <TableBody>
            {data.map(dispute => (
              <TableRow key={dispute.id} onClick={() => handleClick(dispute.to)}>
                <TableCell>
                  <Tag statusId={dispute.statusId}>{dispute.statusLabel}</Tag>
                </TableCell>
                <TableCell className="jur-disputes__table__dispute-name">
                  <div>{dispute.disputeName}</div>
                </TableCell>
                <TableCell>
                  <Countdown
                    duration={dispute.duration}
                    expireDate={dispute.expireDate}
                    showSeconds
                  />
                </TableCell>
                <TableCell>{dispute.category}</TableCell>
                <TableCell className="jur-disputes__table__contract-value">
                  <Amount value={dispute.contractValue} />
                </TableCell>
                <TableCell className="jur-disputes__table__earning">
                  {dispute.earning && <Amount value={dispute.earning} />}
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
        ) : null}
      </Table>
      {emptyMessage}
    </div>
  );
}

export default withRouter(DisputesTable);
