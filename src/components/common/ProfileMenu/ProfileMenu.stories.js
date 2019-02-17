import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ProfileMenu from './';

const menuListDefault = [
  {
    id: 0,
    label: 'Profile Settings',
    to: '#profile',
    active: false
  },
  {
    id: 1,
    label: 'Privacy',
    to: '#privacy',
    active: false
  },
  {
    id: 1,
    label: `FAQ's`,
    to: '#faq',
    active: false
  },
  {
    id: 1,
    label: `Term of Service`,
    to: '#faq',
    active: false
  }
];

const menuListSelected = [
  {
    id: 0,
    label: 'Profile Settings',
    to: '#profile',
    active: true
  },
  {
    id: 1,
    label: 'Privacy',
    to: '#privacy',
    active: false
  },
  {
    id: 1,
    label: `FAQ's`,
    to: '#faq',
    active: false
  },
  {
    id: 1,
    label: `Term of Service`,
    to: '#faq',
    active: false
  }
];

storiesOf('ProfileMenu', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => <ProfileMenu menuList={ menuListDefault } />)
  .add('Selected', () => <ProfileMenu menuList={ menuListSelected } />)