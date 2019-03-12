import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Breadcrumbs from '.';

const crumbList = [
  {
    id: 0,
    label: 'Contracts',
    to: '/contracts'
  },
  {
    id: 1,
    label: 'Create smart contract',
    to: '/create'
  }
];

storiesOf('Breadcrumbs', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Selected', () => <Breadcrumbs crumbList={ crumbList } />)

