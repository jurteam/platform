import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractSelectCategory from "./";

storiesOf("ContractSelectCategory", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractSelectCategory onChange={(ev) => console.log(ev)} hasError={() => null} />
  ));
