import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { EllipsisVIcon } from '../Icons/EllipsisVIcon';

import Dropdown from './';
import DropdownItem from '../DropdownItem';

storiesOf('Dropdown', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <Dropdown label={<EllipsisVIcon />}>
      <DropdownItem onClick={() => alert('DropdownItem handleClick fired')}>
        Archive
      </DropdownItem>
      <DropdownItem onClick={() => alert('DropdownItem handleClick fired')}>
        Archive
      </DropdownItem>
    </Dropdown>
  ))
