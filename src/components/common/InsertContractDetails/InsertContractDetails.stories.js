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
    kpiPlaceholder="Please insert in a clear way some objective elements that can demonstrate the contract has been executed properly."
    resolutionPlaceholder={"Please provide evidence (including external links if appropriate) for assessing if the key performance indicators and contract terms have been met"}
    onKpiChange={e=>console.log('yo')}
    onResolutionProofChange={e=>console.log('yo')}
    onFileAdded={addedFiles=>console.log(addedFiles)}
    uploadedFiles={[{name: 'Hello worldl.pdf'}]}
    onView={e=>console.log('yo')}
    onDelete={e=>console.log('yo')}
    />
  ))
