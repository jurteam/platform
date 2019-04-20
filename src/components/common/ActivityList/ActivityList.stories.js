import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ActivityList from "./";

storiesOf("ActivityList", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ActivityList
      activities={[
        {
          readed: true,
          date: 20190228130000,
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
        },
        {
          readed: true,
          date: 20190228130000,
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
        }
      ]}
    />
  ))
  .add("With new Activities", () => (
    <ActivityList
      activities={[
        {
          readed: true,
          date: 20190228130000,
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
        },
        {
          readed: true,
          date: 20190228130000,
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
        },
        {
          readed: true,
          date: 20190228130000,
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
        },
        {
          readed: false,
          date: 20190228130000,
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
          message:
            "Thank you for your work as only two drafts were delivered out of the requested three we propose the following payment",
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
        }
      ]}
    />
  ));
