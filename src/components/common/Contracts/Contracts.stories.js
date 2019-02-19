import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Contracts from './';

const headers = [
  {
    label: 'Status',
    sortable: () => alert('sort Status')
  },
  {
    label: 'Contract Name',
    sortable: () => alert('sort contract name')
  },
  {
    label: 'Duration',
    sortable: () => alert('sort Duration')
  },
  {
    label: 'Counterparty details',
    sortable: () => alert('sort counterparty details')
  },
  {
    label: 'Value',
    sortable: () => alert('sort Value')
  },
  {
    label: ''
  }
];

const noContracts = [];

const contractsData = [
  {
    id: 1,
    statusId: 2,
    statusLabel: 'ongoing',
    contractName: 'Logo Design',
    duration: 1000*60*60*24*3,
    expireDate: 1000*60*60*24*2,
    counterParties: [
      {
        wallet: '0x496730954769357609478509674309',
        name: 'Alice',
        renderName: true
      },
      {
        wallet: '0x4967309547693576094785674309',
        name: 'Bob',
        renderName: false
      }
    ],
    value: 854667,
    archived: false
  }
];

storiesOf('Contracts', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('No contracts', () => (
    <Contracts
      headers={ headers }
      data={ noContracts }
      handleArchive={contractId => alert('Contractid archived') }
    />
  ))
  .add('Contract list', () => (
    <Contracts
      headers={ headers }
      data={ contractsData }
      handleArchive={contractId => alert('Contractid archived') }
    />
  ))
