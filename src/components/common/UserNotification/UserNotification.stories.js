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
    date: '2019-01-08T14:25:44.335Z',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam',
  },
  {
    id: 2,
    date: '2019-01-08T14:25:44.335Z',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam',
  },
  {
    id: 3,
    date: '2019-01-08T14:25:44.335Z',
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