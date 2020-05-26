import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Row from "./";
import Col from "../Col";

storiesOf("Row", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Sample", () => (
    <Row>
      <div>First Div</div>
      <div>Second Div</div>
      <div>Third Div</div>
      <div>
        All the children in the Row component will render in flex direction row
      </div>
    </Row>
  ))
  .add("with Col", () => (
    <Row>
      <Col>
        <div>First Div</div>
      </Col>
      <Col>
        <div>Second Div</div>
        <div>Third Div</div>
      </Col>
      <Col>Here Second and third Div are inside the same Col component</Col>
    </Row>
  ))
  .add("safe-margin", () => (
    <Row className="jur-safe-margin">
      <Col>
        <div>First Div</div>
      </Col>
      <Col>
        <div>Second Div</div>
        <div>Third Div</div>
      </Col>
      <Col>
        Here Second and third Div are inside the same Col component and a CSS
        class .jur-safe-margin is applied
      </Col>
    </Row>
  ))
  .add("safe-margin mutliple", () => (
    <Col>
      <Row className="jur-safe-margin">
        <Col>
          <div>First Div</div>
        </Col>
        <Col>
          <div>Second Div</div>
          <div>Third Div</div>
        </Col>
      </Row>
      <Row className="jur-safe-margin">
        <Col>Here Second and third Div are inside the same Col component</Col>
        <Col>CSS class .jur-safe-margin is applied</Col>
        <Col>There are multiple Rows here</Col>
      </Row>
      <Row className="jur-safe-margin">
        This is the third Row and it doesn't have Col/s as child/ren.
      </Row>
    </Col>
  ));
