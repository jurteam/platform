import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import MetaMaskAlert from './';

const metaMaskData = {
    title: 'MetaMask is Required',
    description: `MetaMask is an extension for accessing Ethereum enabled distributed applications, or "Dapps" in your normal browser!
                The extension injects the Ethereum web3 API into every website's javascript context, so that dapps can read from the blockchain.`,
    clickHandle: () => alert('get chrome extensino clicked'),
}

storiesOf('MetaMaskAlert', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => <MetaMaskAlert {...metaMaskData} />)