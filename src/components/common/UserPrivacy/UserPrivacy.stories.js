import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import UserPrivacy from "./";

const data = [
  {
    title: "Disclaimer",
    description: "Jur is an interface on the blockchain. Jur can also be used without our Interface. You use this interface provided by Jur AG at your own risk. You will evaluate your decisions with your legal and fiscal advisors. Privacy Policy: Jur AG doesn't store any your personal data, except your email if requested. After 7 days from the conclusion of any contract, the contract will be erased and not stored by Jur AG. Note that if you want to keep recrods, you will need to archive your contracts locally.",
    buttonLabel: "Decline",
    handler: () => alert("Decline")
  },
  {
    title: "Data Management",
    description: "Remove all your offchain data related to your contracts. This will delete all the files associated with your contracts from Jur's servers (e.g. attachments) and also all the details of the contracts so you will no longer see it in your profile. Your data on the blockchain will be there forever",
    buttonLabel: "Delete all your contracts",
    handler: () => alert("Delete all contracts")
  },
  {
    title: "",
    description: "Remove all your offchain data related to your disputes. This will delete all the files associated with your disputes from Jur's servers and also all the details of the dispute so you will no longer see it in your profile. Your data on the blockchain will be there forever.",
    buttonLabel: "Delete all your disputes",
    handler: () => alert("Delete all disputes")
  }
];

storiesOf("UserPrivacy", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => <UserPrivacy data={data} />);
