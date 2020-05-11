import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import MyOathsHeaderBox from "./";

const address = "0x4842e37e90e777b82dd7190499";
const balance = 6654.9;
const rank = 8;
const oaths = [
  {
    amount: 12,
    lockInPeriod: 3,
    startAt: "1588582376",
    releaseAt: "1788682376",
    oathIndex: 1,
    isOathFulfilled: false
  },
  {
    amount: 890,
    lockInPeriod: 3,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 2,
    isOathFulfilled: false
  },
  {
    amount: 90,
    lockInPeriod: 12,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 2,
    isOathFulfilled: true
  },
  {
    amount: 80,
    lockInPeriod: 1,
    startAt: "1548482376",
    releaseAt: "1988492376",
    oathIndex: 2,
    isOathFulfilled: false
  }
];

storiesOf("OathKeeper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("MyOathsHeaderBox", () => (
    <MyOathsHeaderBox
      address={address}
      balance={balance}
      rank={rank}
      oaths={oaths}
    />
  ));
