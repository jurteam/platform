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
  .add('shouldRenderName is true', () => <UserPreview name="Alice" seed="0x3954939439487573664374" shouldRenderName balance="7546857" />)
  .add('shouldRenderName is true and No name available', () => <UserPreview seed="0x3954939439487573664374" shouldRenderName balance="7546857" />)
  .add('shouldRenderName is false', () => <UserPreview name="Alice" seed="0x3954939439487573664374" balance="7546857" />)


