import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractSetDuration from "./";

storiesOf("ContractSetDuration", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractSetDuration onChange={(value) => console.log(value)} hasError={() => null} contract={{duration:{days:4,hours:6,minutes:45}}} />
  ));
