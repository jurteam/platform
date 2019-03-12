import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Avatar from './index';

storiesOf('Avatar', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('No seed', () => (
    <div>
      <Avatar />
    </div>
  ))
  .add('Avatar', () => (
    <div>
      <Avatar seed="0x70aec4b9cffa7b" size="xxsmall" />
      <Avatar seed="0x70aec4b9cffa7b" size="xsmall" />
      <Avatar seed="0x70aec4b9cffa7b" size="small" />
      <Avatar seed="0x70aec4b9cffa7b" size="medium" />
      <Avatar seed="0x70aec4b9cffa7b" size="large" />
      <Avatar seed="0x70aec4b9cffa7b" size="xlarge" />
      <Avatar seed="0x70aec4b9cffa7b" size="xxlarge" />
      <Avatar seed="0x70aec4b9cffa7b" size="xxxlarge" />
    </div>
  ))
  .add('Avatar rounded', () => (
    <div>
      <Avatar seed="0x70aec4b9cffa7b" size="xxsmall" variant="rounded" />
      <Avatar seed="0x70aec4b9cffa7b" size="xsmall" variant="rounded" />
      <Avatar seed="0x70aec4b9cffa7b" size="small" variant="rounded" />
      <Avatar seed="0x70aec4b9cffa7b" size="medium" variant="rounded" />
      <Avatar seed="0x70aec4b9cffa7b" size="large" variant="rounded" />
      <Avatar seed="0x70aec4b9cffa7b" size="xlarge" variant="rounded" />
      <Avatar seed="0x70aec4b9cffa7b" size="xxlarge" variant="rounded" />
      <Avatar seed="0x70aec4b9cffa7b" size="xxxlarge" variant="rounded" />
    </div>
  ))
  .add('Avatar circle', () => (
    <div>
      <Avatar seed="0x70aec4b9cffa7b" size="xxsmall" variant="circle" />
      <Avatar seed="0x70aec4b9cffa7b" size="xsmall" variant="circle" />
      <Avatar seed="0x70aec4b9cffa7b" size="small" variant="circle" />
      <Avatar seed="0x70aec4b9cffa7b" size="medium" variant="circle" />
      <Avatar seed="0x70aec4b9cffa7b" size="large" variant="circle" />
      <Avatar seed="0x70aec4b9cffa7b" size="xlarge" variant="circle" />
      <Avatar seed="0x70aec4b9cffa7b" size="xxlarge" variant="circle" />
      <Avatar seed="0x70aec4b9cffa7b" size="xxxlarge" variant="circle" />
    </div>
  ));