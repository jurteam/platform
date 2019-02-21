import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Input from './';

storiesOf('Input', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Optional', () => (
    <Input
      label="Name"
      id="jur-id"
      type="text"
      name="name"
      value="JUR"
      readOnly
    />
  ))
  .add('Required', () => (
    <Input
      label="Email"
      id="email"
      type="text"
      name="email"
      onChange={() => alert('changed')}
      value="jur@jur.io"
      required
    />
  ))