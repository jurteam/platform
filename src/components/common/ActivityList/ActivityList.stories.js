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
          part_a: "0x000000...",
          part_b: "0x000000...",
          from: {
            wallet: "0x000000...",
            name: "Alice",
            system: false
          },
          abstract: "Sent contract to:",
          to: "0x00000...",
          status: null,
          message: "Lorem ipsum dolor",
          proposal: {
            part_a: 0,
            part_b: 0
          },
          evidences: []
        },
        {
          readed: true,
          date: 20190228130000,
          contract: 234,
          part_a: "0x000000...",
          part_b: "0x000000...",
          from: {
            wallet: "0x000000...",
            name: "Alice",
            system: false
          },
          abstract: "Sent contract to:",
          to: "0x00000...",
          status: null,
          message: "Lorem ipsum dolor",
          proposal: {
            part_a: 0,
            part_b: 0
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
          part_a: "0x000000...",
          part_b: "0x000000...",
          from: {
            wallet: "0x000000...",
            name: "Alice",
            system: false
          },
          abstract: "Sent contract to:",
          to: "0x00000...",
          status: null,
          message: "Lorem ipsum dolor",
          proposal: {
            part_a: 0,
            part_b: 0
          },
          evidences: []
        },
        {
          readed: false,
          date: 20190228130000,
          contract: 234,
          part_a: "0x000000...",
          part_b: "0x000000...",
          from: {
            wallet: "0x000000...",
            name: "Alice",
            system: false
          },
          abstract: "Sent contract to:",
          to: "0x00000...",
          status: null,
          message: "Lorem ipsum dolor",
          proposal: {
            part_a: 0,
            part_b: 0
          },
          evidences: []
        }
      ]}
    />
  ));
