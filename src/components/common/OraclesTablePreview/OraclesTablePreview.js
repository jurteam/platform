import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';
import TableRow from '../TableRow';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import Avatar from '../Avatar';
import Button from '../Button';
import { Link } from 'react-router-dom';
import {MessageIcon} from '../Icons/MessageIcon';
import {toCurrencyFormat, ellipsisString } from '../../../utils/helpers';

import './OraclesTablePreview.scss';
import TimeAgo from '../TimeAgo';


export const OraclesTablePreview = ({currentUserWallet, headers, data, viewAllDetails}) => {
  return (
    <div className="jur-oracles-table-preview">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell
                key={ header.label.toString() }
                {...(header.sortable && {onClick: header.sortable})}
              >
                { header.label }
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="jur-oracles-table-preview__body">
          {data.map(oracle => (
            <TableRow
              key={oracle.ethAddress}
              className={oracle.ethAddress === currentUserWallet ? 'highlight' : ''}
            >
              <TableCell
                className="jur-oracles-table-preview__eth-address"
              >
                {oracle.ethAddress === currentUserWallet ?
                  'You'
                  : ellipsisString(oracle.ethAddress, 10, 15)
                }
              </TableCell>
              <TableCell>
                <Avatar
                  seed={oracle.vote}
                  size="xsmall"
                  variant="circle"
                />
                {}
              </TableCell>
              <TableCell
                className={`jur-oracles-table-preview__message ${oracle.message.length ? 'jur-oracles-table-preview__message--full' : ''}`}
              >
                <MessageIcon />
              </TableCell>
              <TableCell className="jur-oracles-table-preview__amount">
                {toCurrencyFormat(oracle.amount)}
              </TableCell>
              <TableCell className="jur-oracles-table-preview__date">
                <TimeAgo date={oracle.date} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to={viewAllDetails}>
        <Button size="big" fullWidth>View All Details</Button>
      </Link>
    </div>
  );
}