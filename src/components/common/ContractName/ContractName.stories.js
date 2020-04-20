import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { log } from "../../../utils/helpers";

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
      onContractNameChange={ev => log(ev.target.value)}
      statusId={0}
      statusIdLabel="Draft"
    />
  ));
