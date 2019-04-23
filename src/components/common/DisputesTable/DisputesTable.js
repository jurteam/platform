import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Tag from "../Tag";
import Countdown from "../Countdown";
import Amount from "../Amount";
import { Link, withRouter } from "react-router-dom";

import "./DisputesTable.scss";
import DisputesFilters from "../DisputesFilters";

class DisputesTable extends Component {
  handleClick = to => {
    this.props.history.push(to);
  };

  render() {
    const {
      headers,
      data,
      myDisputes,
      getAllDisputes,
      getMyDisputes,
      handleFilterChange,
      handleFilterSubmit
    } = this.props;

    const emptyDisputesMessage = (
      <p>It seems there are no available dispute on Jur!</p>
    );
    const emptyMyDisputesMessage = (
      <>
        <p>It seems you did not create any contract!</p>
        <Link to="/disputes">See all the ongoing disputes on Jur </Link>
      </>
    );
    const emptyMessage = data.length === 0 && (
      <div className="jur-table__empty">
        {myDisputes ? emptyMyDisputesMessage : emptyDisputesMessage}
      </div>
    );
    return (
      <div className="jur-disputes__table">
        <DisputesFilters
          getAllDisputes={getAllDisputes}
          getMyDisputes={getMyDisputes}
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
                <TableRow key={dispute.id} onClick={() => this.handleClick(dispute.to)}>
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
                    />
                  </TableCell>
                  <TableCell>{dispute.category}</TableCell>
                  <TableCell className="jur-disputes__table__contract-value">
                    <Amount value={dispute.contractValue} />
                  </TableCell>
                  <TableCell className="jur-disputes__table__earning">
                    {dispute.earning && <Amount value={dispute.earning} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : null}
        </Table>
        {emptyMessage}
      </div>
    );
  }
}

export default withRouter(DisputesTable);
