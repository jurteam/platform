import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractName from "./";

storiesOf("ContractName", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractName
      contractName="Contract name"
      onContractNameChange={(ev) => console.log(ev.target.value)}
      statusId={0}
      statusIdLabel="Draft"
    />
  ));
