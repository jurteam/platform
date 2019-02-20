import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';
import TableRow from '../TableRow';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import Tag from '../Tag';
import Countdown from '../Countdown';
import Amount from '../Amount';

import './DisputesTable.scss';

export class DisputesTable extends Component {
  render() {
    const { headers, data } = this.props;
    return (
      <Table className="jur-disputes__table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell key={ header.label.toString() } {...(header.sortable && {onClick: header.sortable})}>
                { header.label }
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        { data.length > 0 ?
          <TableBody>
            {data.map(dispute => (
              <TableRow key={ dispute.id }>
                <TableCell>
                  <Tag statusId={dispute.statusId}>
                    { dispute.statusLabel }
                  </Tag>
                </TableCell>
                <TableCell className="jur-disputes__table__dispute-name">
                  <div>
                    { dispute.disputeName }
                  </div>
                </TableCell>
                <TableCell>
                  <Countdown duration={dispute.duration} expireDate={dispute.expireDate} />
                </TableCell>
                <TableCell>
                  { dispute.category }
                </TableCell>
                <TableCell className="jur-disputes__table__contract-value">
                  <Amount value={ dispute.contractValue } />
                </TableCell>
                <TableCell className="jur-disputes__table__earning">
                  {dispute.earning && <Amount value={ dispute.earning } />}
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
            : null }
      </Table>
    )
  }  
};
