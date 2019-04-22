import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Activity from "./";

storiesOf("Activity", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Send to counterparty", () => (
    <Activity
      data={{
        readed: false,
        date: 1555676259000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: "Alice",
          system: false
        },
        abstract: "Sent contract to:",
        to: "0x83764b53nf394n34ndgri346536843",
        status: null,
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: []
      }}
    />
  ))
  .add("Contract Accepted", () => (
    <Activity
      data={{
        readed: false,
        date: 1555330659000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: "Alice",
          system: false
        },
        abstract: "Accepted ... contract name",
        to: "0x83764b53nf394n34ndgri346536843",
        status: null,
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: []
      }}
    />
  ))
  .add("Contract Rejected", () => (
    <Activity
      data={{
        readed: false,
        date: 1555330659000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: "Alice",
          system: false
        },
        abstract: "Rejected contract name",
        to: "0x83764b53nf394n34ndgri346536843",
        status: null,
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: []
      }}
    />
  ))
  .add("Contract Paid", () => (
    <Activity
      data={{
        readed: false,
        date: 1555330659000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: "Alice",
          system: false
        },
        abstract: "Paid contract value of 1100 JUR",
        to: "0x83764b53nf394n34ndgri346536843",
        status: null,
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: []
      }}
    />
  ))
  .add("Friendly Resolution", () => (
    <Activity
      data={{
        readed: false,
        date: 1523794659000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: undefined,
          system: false
        },
        abstract: "Offered a ",
        to: "0x83764b53nf394n34ndgri346536843",
        status: "friendly",
        message: "Thank you for your work as only two drafts were delivered out of the requested three we propose the following payment",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: []
      }}
    />
  ))
  .add("Open dispute", () => (
    <Activity
      data={{
        readed: false,
        date: 1555330659000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: undefined,
          system: false
        },
        abstract: "Created an ",
        to: "0x83764b53nf394n34ndgri346536843",
        status: "dispute",
        message: "I don't think the friendly resolution proposed by Alice is fair. It's true that I worked on two drafts out of the three requested in the contract but I did many more revisions than the required ones as you will see in the evidences. That's why I propose the following resolution.",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: [
          { name: "file1.pdf" },
          { name: "file2.pdf" },
          { name: "file3.pdf" }
        ]
      }}
    />
  ))
  .add("Contract Expired", () => (
    <Activity
      data={{
        readed: false,
        date: 1523794659000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: undefined,
          system: true
        },
        abstract: "Contract Expired",
        to: "0x83764b53nf394n34ndgri346536843",
        status: null,
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: []
      }}
    />
  ))
  .add("Dispute Closed", () => (
    <Activity
      data={{
        readed: false,
        date: 1555330659000,
        contract: 234,
        part_a: "0x496730954769357609478509674309",
        part_b: "0x83764b53nf394n34ndgri346536843",
        from: {
          wallet: "0x496730954769357609478509674309",
          name: undefined,
          system: true
        },
        abstract: "Dispute Closed",
        to: "0x83764b53nf394n34ndgri346536843",
        status: null,
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: {
            value: 234532,
            percentage: 43.54
          },
          part_b: {
            value: 2323445,
            percentage: 60.54
          }
        },
        evidences: []
      }}
    />
  ));
