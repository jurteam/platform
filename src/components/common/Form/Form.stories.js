import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Form from './';

storiesOf('Form', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <Form>
      <Form.Group>
        <Form.Label>Hello world</Form.Label>
        <Form.Input type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select name="coutry" id="country" options={[{value: 'AF', label: 'AFghanistan'}]} />
      </Form.Group>
    </Form>
  ))