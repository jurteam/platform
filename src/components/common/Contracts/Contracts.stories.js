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

const contractsData = [];

storiesOf('Contracts', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <Contracts
      headers={ headers }
      data={ contractsData }
      handleArchive={contractId => alert('Contractid archived') }
    />
  ))

// const data = [
//   {
//     id: 1,
//     statusId: '',
//     contractName: '',
//     duration: '',
//     expireDate: '',
//     counterParties: [
//       {
//         wallet: '',
//         name: '',
//         renderName: ''
//       }
//     ],
//     value,
//     archived: 
//   }
// ]
