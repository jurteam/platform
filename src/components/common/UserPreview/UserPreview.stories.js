import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import UserPreview from './';

storiesOf('UserPreview', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('should render name', () => <UserPreview name="Alice" seed="0x3954939439" shouldRenderName balance="7546857" currency="Jur" />)
  .add('name unavailable', () => <UserPreview name="" seed="0x3954939439" shouldRenderName balance="7546857" currency="Jur" />)
  .add('should render name is false', () => <UserPreview name="Alice" seed="0x3954939439" balance="7546857" currency="Jur" />)
  .add('currency as number', () => <UserPreview name="Alice" seed="0x3954939439" balance={2423} currency="Jur" />)


