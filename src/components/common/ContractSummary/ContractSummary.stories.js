import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractSummary from "./";

storiesOf("ContractSummary", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Empty", () => (
    <ContractSummary
      data={{
        contractID: 34765,
        from: {
          label: "partA",
          debtor: true,
          wallet: {
            address: "0xh845684f893689fh56347563fh3486539463"
          },
          name: "Alice",
          shouldRenderName: true
        },
        to: {
          label: "partB",
          debtor: false,
          wallet: {
            address: "0x38683746f893457h6fh563487fh569834596"
          },
          name: "Bob",
          shouldRenderName: false
        },
        penaltyFee: {
          partA: "",
          partB: ""
        },
        contractName: "",
        amount: "",
        category: null,
        status: { id: 0, label: "Draft", updatedDate: null },
        inCaseOfDispute: null,
        duration: {
          days: 0,
          hours: 0,
          minutes: 0,
          expireAlertFrom: ""
        },
        onContractNameChange: ev => console.log(ev.target.value),
        onProgress: percentage => console.log(percentage),
        onExpire: () => alert("Countdown finished")
      }}
    />
  ))
  .add("Filled", () => (
    <ContractSummary
      data={{
        contractID: 34765,
        from: {
          label: "partA",
          debtor: true,
          wallet: {
            address: "0xh845684f893689fh56347563fh3486539463"
          },
          name: "Alice",
          shouldRenderName: true
        },
        to: {
          label: "partB",
          debtor: false,
          wallet: {
            address: "0x38683746f893457h6fh563487fh569834596"
          },
          name: "Bob",
          shouldRenderName: false
        },
        penaltyFee: {
          partA: 8654,
          partB: 1123
        },
        contractName: "Logo Design Contract for electronic cigarettes brand",
        amount: 10000,
        category: {
          value: 2,
          label: "Freelancer Agreement"
        },
        status: {
          id: 5,
          label: "OnGoing",
          updatedDate: "February 24, 2019 23:30:00"
        },
        inCaseOfDispute: {
          value: 2,
          label: "Open Hubs"
        },
        duration: {
          days: 15,
          hours: 0,
          minutes: 0,
          expireAlertFrom: 1000 * 60 * 60 * 24 // 24 hours
        },
        onContractNameChange: ev => console.log(ev.target.value),
        onProgress: percentage => console.log(percentage),
        onExpire: ev => console.log(ev.target.value)
      }}
    />
  ));
