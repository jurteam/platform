import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Row from "../Row";
import AmountFilter from "./";
import { MIN_TOKEN_AMOUNT } from "../../../api/connex/OathKeeper";

storiesOf("AmountFilter", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Min", () => (
    <AmountFilter
      name="Min"
      min={MIN_TOKEN_AMOUNT}
      hideActions={true}
      onChange={value => console.log(value)}
    />
  ))
  .add("Max", () => (
    <AmountFilter
      name="Max"
      min={MIN_TOKEN_AMOUNT}
      hideActions={true}
      onChange={value => console.log(value)}
    />
  ))
  .add("Min & Max", () => (
    <Row>
      <AmountFilter
        name="Min"
        min={MIN_TOKEN_AMOUNT}
        hideActions={true}
        onChange={value => console.log(value)}
      />
      <AmountFilter
        name="Max"
        min={MIN_TOKEN_AMOUNT}
        hideActions={true}
        onChange={value => console.log(value)}
      />
    </Row>
  ));
