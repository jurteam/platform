import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';


import UploadForm from './';

storiesOf('UploadForm', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <UploadForm
    onAddFile={files => console.log(files)}
    />
  ))