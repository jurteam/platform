import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractCategory from './';

storiesOf('ContractCategory', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <ContractCategory
      selectedCategories={{value: 2, label: 'Freelance Agreement' }}
    />
  ))