import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Button from './index';

storiesOf('Button', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('default', () => <Button>Default Button</Button>)
  .add('disabled', () => <Button disabled>Disabled Button</Button>)
  .add('small', () => <Button size="small">Small Button</Button>)
  .add('medium', () => <Button size="medium">Medium Button</Button>)
  .add('big', () => <Button size="big">Big Button</Button>)
  .add('full width', () => <Button fullWidth>Full width Button</Button>)
  .add('Info small contained', () => <Button color="info" variant="contained" size="small">New smart contract</Button>)
  .add('Info small outlined', () => <Button color="info" variant="outlined" size="small">New smart contract</Button>)
  .add('Success small contained', () => <Button color="success" variant="contained" size="small">New smart contract</Button>)
  .add('Success small outlined', () => <Button color="success" variant="outlined" size="small">New smart contract</Button>)
  .add('Dispute small contained', () => <Button color="dispute" variant="contained" size="small">New smart contract</Button>)
  .add('Dispute small outlined', () => <Button color="dispute" variant="outlined" size="small">New smart contract</Button>)
  .add('Muted small contained', () => <Button color="muted" variant="contained" size="small">New smart contract</Button>)
  .add('Muted small outlined', () => <Button color="muted" variant="outlined" size="small">New smart contract</Button>)
  .add('Gradient small ', () => <Button color="gradient" size="medium">New smart contract</Button>)
  .add('Raised small ', () => <Button color="dispute" variant="raised" size="medium">New smart contract</Button>)
