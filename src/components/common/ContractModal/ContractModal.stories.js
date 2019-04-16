import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractModal from "./";

storiesOf("ContractModal", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Send to counterparty", () => (
    <ContractModal title="Send to counterparty" content="You are entering into a smart contract and escrow agreement with another party. You may also be entering into a legal agreement. You are using Jur under your own exclusive responsibility. If you have any doubts, please ask your lawyer to review your contract. There is no centralized authority that has the power to intervene in your contract before completion or dispute resolution" />
  ))
  .add("Accept Smart Contract", () => (
    <ContractModal title="Accept Smart Contract" content="You are entering into a smart contract and escrow agreement with another party. You may also be entering into a legal agreement. You are using Jur under your own exclusive responsibility. If you have any doubts, please ask your lawyer to review your contract. There is no centralized authority that has the power to intervene in your contract before completion or dispute resolution" />
  ));
