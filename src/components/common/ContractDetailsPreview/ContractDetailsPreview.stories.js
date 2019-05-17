import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractDetailsPreview from "./";

storiesOf("ContractDetailsPreview", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractDetailsPreview
      contract={{
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
        details: {
          kpi: {
            label: "KPI of the contracts:",
            message:
              "0x55fe002aeff02f77364de339a1292923a15844b8 should deliver three draft of high quality (reference in the attachments) within 5 days of the acceptance of the contract. The designer has to make 2 revisions for each draft within 3 days. They will be specified within 24 hours from the delivery of the initial drafts. The terms are very clear if 0x55fe002aeff02f77364de339a1292923a15844b8 does not deliver according to the above timeline we should have a complete refund as timeline is very important to us. The logo quality should be comparable to those already present in the designer portfolio.  Deliverables should be uploaded in a shared Google Drive folder and should consists in the following format for each draft: .PDF, .PSD/.AI/.SKETCH, .PNG. In case the work of 0x55fe002aeff02f77364de339a1292923a15844b8 is not appreciated by us but still meets all the above criterias then she should get a reduced payment in the terms described in the signed contract."
          },
          resolution: {
            label: "Resolution Proof:",
            message:
              "0x55fe002aeff02f77364de339a1292923a15844b8 should upload all the deliverables in the Google Drive folder at the following link http://goo.gl/logo-design (test here same origin url: http://localhost:9009/testSameOrigin ), which will be made public in case of dispute. Oracles would be able to see each deliverable and can also check email extracts between the parties for the revisions requested."
          }
        },
        files: [
          {
            name: "hello.pdf"
          }
        ],
        onContractNameChange: (ev) => console.log(ev.target.value),
        onProgress: percentage => console.log(percentage),
        onExpire: (ev) => console.log(ev.target.value)
      }}
      onDelete={(ev) => console.log("dilghf")}
      onView={(ev) => console.log("dilghf")}
    />
  ));
