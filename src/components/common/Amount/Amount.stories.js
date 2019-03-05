import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Amount from './';

storiesOf('Amount', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('value as string ', () => (
    <>
      <Amount value="8346583" currency="JUR"/>
      <br />
      <Amount value="1000" currency="JUR"/>
      <br />
      <Amount value="3230" currency="JUR"/>
    </>
  ))
  .add('value as number and no currency', () => (
    <>
      <Amount value={8346583}  />
      <br />
      <Amount value={1000} />
      <br />
      <Amount value={3230}/>
    </>
  ))