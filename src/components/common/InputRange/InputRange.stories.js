import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import InputRange from "./";

storiesOf("InputRange", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <InputRange
      min="0"
      max="100"
      defaultValue={0}
      onValueChange={(value) => log(value)}
    />
  ));
