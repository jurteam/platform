import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import AvatarChart from "./";

storiesOf("AvatarChart", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("percentage as number", () => (
    <AvatarChart seed="pinko" percentage={43.76} color="green" />
  ))
  .add("percentage as string", () => (
    <AvatarChart seed="pallino" percentage="75%" color="blue" />
  ));
