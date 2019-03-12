import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractAccordion from './';

storiesOf('ContractAccordion', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <ContractAccordion title="Activity">
      <div>Hello world</div>
    </ContractAccordion>
  ))
  .add('Bordered', () => (
    <ContractAccordion title="Activity" borderBottom>
      <div>Hello world</div>
    </ContractAccordion>
  ))
  