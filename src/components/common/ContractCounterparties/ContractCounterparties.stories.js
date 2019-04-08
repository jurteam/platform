import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractCounterparties from "./";

storiesOf("ContractCounterparties", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractCounterparties
      counterparties={[
        {
          name: "Alice",
          wallet: "0xksyg8i357ytib385yi3",
          shouldRenderName: true
        },
        {
          name: "Bob",
          wallet: "0x3876h93845h945938f4756f9h34653974h6",
          shouldRenderName: false
        }
      ]}
    />
  ));
