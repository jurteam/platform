import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { log } from "../../../utils/helpers";

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
      onChange={value => log(value)}
      onSubmit={() => log("filter submit")}
    />
  ));
