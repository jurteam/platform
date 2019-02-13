import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from '../components/common/Button';
import '../components/common/Button/Button.scss';

storiesOf('Button', module)
  .add('default', () => <Button>Default Button</Button>)
  .add('disabled', () => <Button disabled>Default Button</Button>);