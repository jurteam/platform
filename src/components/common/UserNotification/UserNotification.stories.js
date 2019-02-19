import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import UserNotification from './';

const headers = [
  {
    label: 'Date',
    sortable: (e, desc) => alert('Desc is:' + desc )
  },
  {
    label: 'Message',
  }
];

const data = [
  {
    id: 1,
    date: 'few seconds ago',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam',
  },
  {
    id: 2,
    date: 'few minutes ago',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam',
  },
  {
    id: 3,
    date: 'few hours ago',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam',
  }
]

storiesOf('UserNotification', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Draft', () => (
    <UserNotification
      title="Notification"
      headers={ headers }
      data={ data } 
    />
  ))