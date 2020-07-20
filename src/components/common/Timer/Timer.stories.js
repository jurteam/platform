import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Timer from "./";
const sampleRender = t =>
  `Ends in time:${t.value} unit:${
    t.unit
  }. In case of unit:past, time is always "now"`;

storiesOf("Timer", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("Seconds", () => (
    <Timer
      time={new Date(new Date().getTime() + 1000 * 20)}
      render={sampleRender}
    />
  ))
  .add("Minutes", () => (
    <Timer
      time={new Date(new Date().getTime() + 1000 * 60 * 20)}
      render={sampleRender}
    />
  ))
  .add("Hours", () => (
    <Timer
      time={new Date(new Date().getTime() + 1000 * 60 * 60 * 20)}
      render={sampleRender}
    />
  ))
  .add("Days", () => (
    <Timer
      time={new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 20)}
      render={sampleRender}
    />
  ))
  .add("Epoch 1594990393", () => (
    <Timer
      time={new Date(1594990393 * 1000 + 1594990393)}
      render={sampleRender}
    />
  ));
