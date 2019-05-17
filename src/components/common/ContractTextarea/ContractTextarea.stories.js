import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractTextarea from ".";

storiesOf("ContractTextarea", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractTextarea
      label="KPI of the contracts:"
      name="kpi"
      onChange={(ev) => console.log(ev.target.value)}
    />
  ));
