import React, { useState } from "react";
import PropTypes from "prop-types";
import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Avatar from "../Avatar";
import FileList from "../FileList";
import File from "../File";
import Tag from "../Tag";
import TimeAgo from "../TimeAgo";

import { toCurrencyFormat, ellipsisString } from "../../../utils/helpers";

import "./OraclesTable.scss";

export const OraclesTable = props => {
  const {
    currentUserWallet,
    headers,
    data,
    dispute,
    onFileView
  } = props;
  const [tableRows, updateTableRows] = useState(data);

  const handleClick = idx => {
    const newRows = tableRows.map((row, rowIdx) => {
      if (idx === rowIdx) {
        row.isOpen = !row.isOpen;
      } else {
        row.isOpen = false;
      }
      return row;
    });
    updateTableRows(newRows);
  };

  return (
    <div className="jur-oracles-table">
      <div className="jur-oracles-table__dispute">
        <div className="jur-oracles-table__dispute-name">{dispute.name}</div>
        <Tag statusId={dispute.status.id}>{dispute.status.label}</Tag>
      </div>
      <div className="jur-oracles-table__table">
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
          <TableBody className="jur-oracles-table__body">
            {tableRows.map((oracle, idx) => (
              <TableRow
                key={oracle.ethAddress}
                className={`${oracle.isOpen ? "active" : ""}`}
                onClick={() => handleClick(idx)}
              >
                <TableCell className="jur-oracles-table__oracle">
                  {oracle.ethAddress === currentUserWallet
                    ? "You"
                    : oracle.ethAddress}
                </TableCell>
                <TableCell>
                  <Avatar seed={oracle.vote} size="xsmall" variant="circle" />
                </TableCell>
                <TableCell className="jur-oracles-table__message">
                  {oracle.isOpen ? (
                    <>{oracle.message}</>
                  ) : (
                    <>{ellipsisString(oracle.message, 80, 80)}</>
                  )}
                </TableCell>
                <TableCell className="jur-oracles-table__evidence">
                  {oracle.evidences && oracle.evidences.length > 0 && (
                    <>
                      {!oracle.isOpen && (
                        <span className="jur-oracles-table__evidence__counter">
                          {oracle.evidences.length} attachment
                          {oracle.evidences.length > 1 ? "s" : ""}
                        </span>
                      )}
                      {oracle.isOpen && (
                        <FileList>
                          {oracle.evidences.map(file => (
                            <File
                              key={file.name}
                              name={ellipsisString(file.name, 20, 20)}
                              onView={() => onFileView(file.name)}
                              small
                            />
                          ))}
                        </FileList>
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell className="jur-oracles-table__amount">
                  {toCurrencyFormat(oracle.amount)}
                </TableCell>
                <TableCell className="jur-oracles-table__date">
                  <TimeAgo date={oracle.date} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
