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
  .add('Avatar', () => (
    <div>
      <Avatar seed="0x70aec4b9cffa7b" size="xxsmall" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xsmall" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="small" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="medium" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="large" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xlarge" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xxlarge" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xxxlarge" />
    </div>
  ))
  .add('Avatar rounded', () => (
    <div>
      <Avatar seed="0x70aec4b9cffa7b" size="xxsmall" variant="rounded" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xsmall" variant="rounded" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="small" variant="rounded" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="medium" variant="rounded" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="large" variant="rounded" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xlarge" variant="rounded" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xxlarge" variant="rounded" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xxxlarge" variant="rounded" />
    </div>
  ))
  .add('Avatar circle', () => (
    <div>
      <Avatar seed="0x70aec4b9cffa7b" size="xxsmall" variant="circle" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xsmall" variant="circle" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="small" variant="circle" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="medium" variant="circle" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="large" variant="circle" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xlarge" variant="circle" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xxlarge" variant="circle" />
      <br />
      <Avatar seed="0x70aec4b9cffa7b" size="xxxlarge" variant="circle" />
    </div>
  ));