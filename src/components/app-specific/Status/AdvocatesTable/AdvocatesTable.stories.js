import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import AdvocatesTable from ".";

const holders = [
  {
    address: "0x4213232275b0228f69a06c37ef9c0186f19e999d",
    statusType: "Justinian"
  },
  {
    address: "0x4213232275b0228f69a06c37ef330186f19e999d",
    statusType: "Solomon"
  },
  {
    address: "0x4213232275b0223369a06c37ef9c0186f19e999d",
    statusType: "Justinian"
  },
  {
    address: "0x4213232275b0228f69a06c37ef9c0186f19e999d",
    statusType: "Justinian"
  },
  {
    address: "0x4213232275b0228f69a03337ef9c0186f19e999d",
    statusType: "Solomon"
  },
  {
    address: "0x4213232335b0228f69a06c37ef9c0186f19e999d",
    statusType: "Justinian"
  }
];

storiesOf("Status", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("AdvocatesTable", () => <AdvocatesTable holders={holders} />);
