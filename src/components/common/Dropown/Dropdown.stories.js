import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import centered from '@storybook/addon-centered';
import { EllipsisVIcon } from '../Icons/EllipsisVIcon';

import Dropdown from './';
import DropdownItem from '../DropdownItem';

storiesOf('Dropdown', module)
  .addDecorator(withInfo)
  .addDecorator(centered)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Single action', () => (
    <Dropdown label={<EllipsisVIcon />}>
      <DropdownItem onClick={() => alert('DropdownItem handleClick fired')}>
        Archive
      </DropdownItem>
    </Dropdown>
  ))
  .add('Multiple action', () => (
    <Dropdown label={<EllipsisVIcon />}>
      <DropdownItem onClick={() => alert('Action 1 fired')}>
        Action 1
      </DropdownItem>
      <DropdownItem onClick={() => alert('Action 2 fired')}>
        Action 2
      </DropdownItem>
    </Dropdown>
  ))
