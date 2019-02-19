import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Table from '../Table';
import TableRow from '../TableRow';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableHead from '../TableHead';

export const UserNotification = ({ title, headers, data, className }) => {
  return (
    <div className={`jur-user-notification ${className || ''}`}>
      <h3>{ title }</h3>
      <Table className="jur-user-notification__table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell {...(header.sortable && {onClick: header.sortable})}>
                { header.label }
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow>
              <TableCell>
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