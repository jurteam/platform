import React, { useContext } from "react";
import Table from "../Table";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import Avatar from "../Avatar";
import Button from "../Button";
import { Link } from "react-router-dom";
import { MessageIcon } from "../Icons/MessageIcon";
import { toCurrencyFormat, ellipsisString } from "../../../utils/helpers";

import "./OraclesTablePreview.scss";
import TimeAgo from "react-timeago";
import { AppContext } from "../../../bootstrap/AppProvider";

export const OraclesTablePreview = ({
  currentUserWallet,
  headers,
  data,
  viewAllDetails
}) => {
  const { labels } = useContext(AppContext);
  return data.length > 0 ? (
    <div className="jur-oracles-table-preview">
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
        <TableBody className="jur-oracles-table-preview__body">
          {data.map(oracle => (
            <TableRow
              key={oracle.oracle_wallet.toLowerCase()}
              className={
                oracle.oracle_wallet.toLowerCase() ===
                currentUserWallet.toLowerCase()
                  ? "highlight"
                  : ""
              }
            >
              <TableCell className="jur-oracles-table-preview__eth-address">
                {oracle.oracle_wallet.toLowerCase() ===
                currentUserWallet.toLowerCase()
                  ? labels.you
                  : ellipsisString(oracle.oracle_wallet.toLowerCase(), 10, 15)}
              </TableCell>
              <TableCell>
                <Avatar
                  seed={oracle.wallet_part.toLowerCase()}
                  size="xsmall"
                  variant="circle"
                />
              </TableCell>
              <TableCell
                className={`jur-oracles-table-preview__message ${
                  oracle.message.length
                    ? "jur-oracles-table-preview__message--full"
                    : ""
                }`}
              >
                <MessageIcon />
              </TableCell>
              <TableCell className="jur-oracles-table-preview__amount">
                {toCurrencyFormat(oracle.amount)}
              </TableCell>
              <TableCell className="jur-oracles-table-preview__date">
                <TimeAgo date={oracle.voted_at || null} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to={viewAllDetails}>
        <Button size="big" fullWidth>
          {labels.viewAllDetails}
        </Button>
      </Link>
    </div>
  ) : (
    <div className="jur-dispute-vote__note">
      <p>{labels.noOracles}</p>
    </div>
  );
};
