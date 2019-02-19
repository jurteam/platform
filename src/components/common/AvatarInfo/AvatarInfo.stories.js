import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import AvatarInfo from './';

storiesOf('AvatarInfo', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('default', () => <AvatarInfo userName="Alice" userWallet="0xa5ca68996a5d4c16acbc99876fd1f4d82ea78ca4" />)
  .add('Ellipsis', () => <AvatarInfo userName="Alice" userWallet="0xa5ca68996a5d4c16acbc99876fd1f4d82ea78ca4" variant="ellipsis" />)