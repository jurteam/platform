import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Table from '../Table';
import TableRow from '../TableRow';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableHead from '../TableHead';

import './UserNotification.scss';

export const UserNotification = ({ title, headers, data, className }) => {
  return (
    <div className={`jur-user-notification ${className || ''}`}>
      <h3>{ title }</h3>
      <Table className="jur-user-notification__table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell key={ header.label.toString() } {...(header.sortable && {onClick: header.sortable})}>
                { header.label }
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={ row.id } className="jur-user-notification__table__row">
              <TableCell className="jur-user-notification__table__cell" key={ row.date.toString() }>
                {row.date}
              </TableCell>
              <TableCell>
                {row.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};