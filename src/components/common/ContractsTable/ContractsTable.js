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

import './ContractsTable.scss';

export const ContractsTable = ({ headers, data, handleArchive, newContract }) => {
  const emptyMessage = (
    data.length === 0 &&
    <div className="jur-table__empty">
      <p>It seems you did not create any contract!</p>
      <Button variant="gradient" onClick={newContract}>Create your first contract</Button>
    </div>
  );

  return (
    <div className="jur-contracts__table">
      <Table>
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
        { emptyMessage }
    </div>
  )
}