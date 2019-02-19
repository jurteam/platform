import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '../Table';
import TableRow from '../TableRow';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import Tag from '../Tag';
import Countdown from '../Countdown';
import AvatarInfo from '../AvatarInfo';
import Dropdown from '../Dropown';
import DropdownItem from '../DropdownItem';
import { EllipsisVIcon } from '../Icons/EllipsisVIcon';
import Button from '../Button';
import Amount from '../Amount';

import './Contracts.scss';

export class Contracts extends Component {
  render() {
    const { headers, data, handleArchive } = this.props;

    return (
      <div className="jur-contracts">
        <Table className="jur-contracts__table">
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
              {data.map(contract => (
                <TableRow key={ contract.id }>
                  <TableCell>
                    <Tag statusId={contract.statusId}>
                      { contract.statusLabel }
                    </Tag>
                  </TableCell>
                  <TableCell>
                    {contract.contractName}
                  </TableCell>
                  <TableCell>
                    <Countdown duration={contract.duration} expireDate={contract.expireDate} />
                  </TableCell>
                  <TableCell>
                    {contract.counterParties.map(counterParty => (
                      <AvatarInfo key={counterParty.wallet} userName={counterParty.name} userWallet={counterParty.wallet} renderName={ counterParty.renderName } />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Amount value={ contract.value } />
                  </TableCell>
                  { !contract.archived ?
                    <TableCell>
                      <Dropdown label={<EllipsisVIcon />}>
                        <DropdownItem onClick={() => handleArchive(contract.id)}>
                          Archive
                        </DropdownItem>
                      </Dropdown>
                    </TableCell>
                    : null }
                </TableRow>
              ))}
              </TableBody>
              : null }
          </Table>
          {data.length === 0 &&
            <div className="jur-contracts__empty">
              <p>It seems you did not create any contract!</p>
              <Button variant="gradient">Create your first contract</Button>
            </div>
          }
      </div>
    )
  }  
}