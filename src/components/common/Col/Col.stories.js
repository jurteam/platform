import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Col from "./";

storiesOf("Col", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Sample", () => (
    <Col>
      <div>First Div</div>
      <div>Second Div</div>
      <div>Third Div</div>
      <div>
        All the children in the Col component will render in flex direction
        column
      </div>
    </Col>
  ));
