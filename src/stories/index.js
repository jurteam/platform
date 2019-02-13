import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from '../components/common/Button';
import '../components/common/Button/Button.scss';

storiesOf('Button', module)
  .add('default', () => <Button>Default Button</Button>)
  .add('disabled', () => <Button disabled>Disabled Button</Button>)
  .add('small', () => <Button size="small">Small Button</Button>)
  .add('medium', () => <Button size="medium">Medium Button</Button>)
  .add('big', () => <Button size="big">Big Button</Button>)
  .add('full width', () => <Button fullWidth={true}>Full width Button</Button>);