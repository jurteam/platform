import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import centered from "@storybook/addon-centered/react";

import InfoTootip from "./";

storiesOf("InfoTooltip", module)
  .addDecorator(withInfo)
  .addDecorator(centered)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Without text", () => <InfoTootip />)
  .add("With text Top", () => (
    <InfoTootip
      position="top"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel laoreet augue, eget pellentesque dui posuere"
    />
  ))
  .add("With text right", () => (
    <InfoTootip
      position="right"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel laoreet augue, eget pellentesque dui posuere"
    />
  ))
  .add("With text bottom", () => (
    <InfoTootip
      position="bottom"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel laoreet augue, eget pellentesque dui posuere"
    />
  ))
  .add("With text left", () => (
    <InfoTootip
      position="left"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel laoreet augue, eget pellentesque dui posuere"
    />
  ));
