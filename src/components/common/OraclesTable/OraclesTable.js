import React, { useState, useEffect, useContext } from "react";

import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Avatar from "../Avatar";
import FileList from "../FileList";
import File from "../File";
import Tag from "../Tag";
import TimeAgo from "react-timeago";
import Pagination from "../Pagination";
import { SpinnerOnly } from "../Spinner";

import { toCurrencyFormat, ellipsisString } from "../../../utils/helpers";

import "./OraclesTable.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const OraclesTable = ( props ) => {
  const {
    currentUserWallet,
    headers,
    data,
    onPageChange,
    initialPage,
    oraclesPerPage,
    totalOracles,
    loading,
    dispute,
    onFileView
  } = props;
  const [tableRows, updateTableRows] = useState(data);
  const [activePage, setActivePage] = useState(initialPage);

  useEffect(() => {
    updateTableRows(data);

    return () => null;
  }, [data]);

  const { labels } = useContext(AppContext);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };

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
              {headers.map((header) => (
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
            {tableRows.map((oracle, idx) => {
              const evidences = oracle.attachments.data || [];
              const oracleWallet = oracle.oracle_wallet
                ? oracle.oracle_wallet.toLowerCase()
                : null;
              const userWallet = currentUserWallet
                ? currentUserWallet.toLowerCase()
                : null;

              let rowParams = {};
              if (!oracle.isOpen) {
                rowParams = { onClick: () => handleClick(idx) };
              }

              return (
                <TableRow
                  key={oracleWallet}
                  className={`${oracle.isOpen ? "active" : ""}`}
                  {...rowParams}
                >
                  <TableCell className="jur-oracles-table__oracle">
                    {oracleWallet === userWallet ? labels.you : oracleWallet}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      seed={oracle.wallet_part.toLowerCase()}
                      size="xsmall"
                      variant="circle"
                    />
                  </TableCell>
                  <TableCell className="jur-oracles-table__message">
                    {oracle.isOpen ? (
                      <>{oracle.message}</>
                    ) : (
                      <>{ellipsisString(oracle.message, 80, 80)}</>
                    )}
                  </TableCell>
                  <TableCell className="jur-oracles-table__evidence">
                    {evidences && evidences.length > 0 && (
                      <>
                        {!oracle.isOpen && (
                          <span className="jur-oracles-table__evidence__counter">
                            {`${evidences.length} ${
                              evidences.length > 1
                                ? labels.attachments
                                : labels.attachment
                            } `}
                          </span>
                        )}
                        {oracle.isOpen && (
                          <FileList>
                            {evidences.map((file, fidx) => (
                              <File
                                key={`oracle-evidence-${idx}-${fidx}`}
                                name={ellipsisString(file.fileName, 20, 20)}
                                onView={() => onFileView(file)}
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
                    <TimeAgo date={oracle.voted_at || null} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {data.length > 0 && loading === true && (
          <SpinnerOnly loading={loading} className={"table__loading"} />
        )}
        {data.length > 0 ? (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={oraclesPerPage}
            totalItemsCount={totalOracles}
            handlePageChange={handlePageChange}
            // getPageUrl={(i) => "https://customLink/#" + i}
          />
        ) : (
          <div className="jur-dispute-vote__note">
            <p>{labels.noOracles}</p>
          </div>
        )}
      </div>
    </div>
  );
};
