import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractsFilters from "./";

storiesOf("ContractsFilters", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractsFilters
      onChange={value => console.log(value)}
      onSubmit={() => console.log('filter submit')}
    />
  ));
