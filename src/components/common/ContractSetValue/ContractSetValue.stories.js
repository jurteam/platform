import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractSetValue from "./";

storiesOf("ContractSetValue", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractSetValue
      contract={{
        contractID: 34765,
        amount: 300,
        from: {
          label: "partA",
          debtor: true,
          wallet: "0xh845684f893689fh56347563fh3486539463",
          name: "Alice",
          shouldRenderName: true
        },
        to: {
          label: "partB",
          debtor: false,
          wallet: "0x38683746f893457h6fh563487fh569834596",
          name: "Bob",
          shouldRenderName: false
        },
        penaltyFee: null,
        currentUserCanPay: true
      }}
    />
  ))
  .add("With fee message", () => (
    <ContractSetValue
      showFeeMsg
      contract={{
        contractID: 34765,
        from: {
          label: "partA",
          debtor: true,
          wallet: "0xh845684f893689fh56347563fh3486539463",
          name: "Alice",
          shouldRenderName: true
        },
        to: {
          label: "partB",
          debtor: false,
          wallet: "0x38683746f893457h6fh563487fh569834596",
          name: "Bob",
          shouldRenderName: false
        },
        penaltyFee: null
      }}
    />
  ));
