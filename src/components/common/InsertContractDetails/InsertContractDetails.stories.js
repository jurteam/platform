import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import InsertContractDetails from './';

storiesOf('InsertContractDetails', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <InsertContractDetails
    onKpiChange={e=>console.log('yo')}
    onResolutionProofChange={e=>console.log('yo')}
    onAddFile={e=>console.log('yo')}
    uploadedFiles={[{name: 'Hello worldl.pdf'}]}
    onView={e=>console.log('yo')}
    onDelete={e=>console.log('yo')}
    />
  ))
