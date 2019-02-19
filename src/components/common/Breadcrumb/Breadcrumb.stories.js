import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Breadcrumb from './';

const crumbListDefault = [
  {
    id: 0,
    label: 'Contracts',
    to: '#contracts',
    active: false
  }
];

const crumbListSelected = [
  {
    id: 0,
    label: 'Contracts',
    to: '#contracts',
    active: false
  },
  {
    id: 1,
    label: 'Create smart contract',
    to: '#create',
    active: true
  }
];

storiesOf('Breadcrumb', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => <Breadcrumb crumbList={ crumbListDefault } />)
  .add('Selected', () => <Breadcrumb crumbList={ crumbListSelected } />)

