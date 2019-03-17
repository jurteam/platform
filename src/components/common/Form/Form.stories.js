import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Form from "./";

storiesOf("Form", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <Form>
      <Form.Group>
        <Form.Label>Hello world</Form.Label>
        <Form.Input type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hello world</Form.Label>
        <Form.Input type="text" error />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hello world</Form.Label>
        <Form.Input type="text" errorMsg="hello" error />
      </Form.Group>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select
          name="coutry"
          id="country"
          options={[{ value: "AF", label: "AFghanistan" }]}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select
          name="coutry"
          id="country"
          options={[{ value: "AF", label: "AFghanistan" }]}
          error
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select
          name="coutry"
          id="country"
          options={[{ value: "AF", label: "AFghanistan" }]}
          errorMsg="hello world"
          error
        />
      </Form.Group>
      <Form.Group>
        <Form.NumericInput
          label="days"
          value={0}
          onChange={value => console.log(value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.NumericInput
          label="days"
          value={0}
          onChange={value => console.log(value)}
          error
        />
      </Form.Group>
      <Form.Group>
        <Form.NumericInput
          label="days"
          value={0}
          onChange={value => console.log(value)}
          errorMsg="hello world"
          error
        />
      </Form.Group>
      <Form.Group>
        <Form.DatePicker
          selectedDate={new Date()}
          onChange={value => console.log(value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.DatePicker
          selectedDate={new Date()}
          onChange={value => console.log(value)}
          error
        />
      </Form.Group>
      <Form.Group>
        <Form.DatePicker
          selectedDate={new Date()}
          onChange={value => console.log(value)}
          errorMsg="hello world"
          error
        />
      </Form.Group>
      <Form.Group>
        <Form.Search />
      </Form.Group>
    </Form>
  ));
