import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractSetPenaltyFee from "./";

storiesOf("ContractSetPenaltyFee", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractSetPenaltyFee
      contract={{
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
      setPenaltyFeeStatus={(value) => console.log(value)}
      ContractSetPenaltyFee={(value) => console.log(value)}
    />
  ))
  .add("Width Penalty fee", () => (
    <ContractSetPenaltyFee
      contract={{
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
        penaltyFee: {
          partA: 4436758,
          partB: 32345
        }
      }}
      setPenaltyFeeStatus={(value) => console.log(value)}
      ContractSetPenaltyFee={(value) => console.log(value)}
    />
  ));
