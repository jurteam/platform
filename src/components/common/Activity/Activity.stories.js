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
  .add("Default", () => (
    <Activity
      data={{
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
      }}
    />
  ))
  .add("Friendly Resolution", () => (
    <Activity
      data={{
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
        abstract: "Offered a ",
        to: "0x00000...",
        status: "friendly",
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: 0,
          part_b: 0
        },
        evidences: []
      }}
    />
  ))
  .add("Open dispute", () => (
    <Activity
      data={{
        readed: false,
        date: 20190228130000,
        contract: 234,
        part_a: "0x000000...",
        part_b: "0x000000...",
        from: {
          wallet: "0x000000...",
          system: false
        },
        abstract: "Created an ",
        to: "0x00000...",
        status: "dispute",
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: 0,
          part_b: 0
        },
        evidences: []
      }}
    />
  ))
  .add("Contract expired from system", () => (
    <Activity
      data={{
        readed: false,
        date: 20190228130000,
        contract: 234,
        part_a: "0x000000...",
        part_b: "0x000000...",
        from: {
          wallet: "0x000000...",
          name: "Jur System",
          system: true
        },
        abstract: "Created an ",
        to: "0x00000...",
        status: "expired",
        message: "Lorem ipsum dolor",
        proposal: {
          part_a: 0,
          part_b: 0
        },
        evidences: []
      }}
    />
  ));
