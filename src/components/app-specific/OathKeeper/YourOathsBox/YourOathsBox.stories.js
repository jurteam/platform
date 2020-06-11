import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Section from "JurCommon/Section";
import YourOathsBox from "./";

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

const oaths2 = [
  {
    amount: 890,
    lockInPeriod: 3,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 2,
    isOathFulfilled: false
  },
  ...oaths
];

const empty = [];

const withdraw = [
  {
    amount: 890,
    lockInPeriod: 1,
    startAt: "1548482376",
    releaseAt: "1588582376",
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
    amount: 890,
    lockInPeriod: 36,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 3,
    isOathFulfilled: false
  },
  {
    amount: 890,
    lockInPeriod: 10,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 4,
    isOathFulfilled: false
  }
];

const noWithdraw = [
  {
    amount: 890,
    lockInPeriod: 3,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 1,
    isOathFulfilled: true
  },
  {
    amount: 90,
    lockInPeriod: 3,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 2,
    isOathFulfilled: true
  },
  {
    amount: 350,
    lockInPeriod: 4,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 3,
    isOathFulfilled: true
  },
  {
    amount: 30,
    lockInPeriod: 36,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 4,
    isOathFulfilled: true
  }
];
const oaths5 = [...oaths, ...oaths2];

storiesOf("OathKeeper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("YourOathsBox", () => (
    <Section>
      <YourOathsBox oaths={oaths} />
    </Section>
  ))
  .add("YourOathsBox - Empty", () => (
    <Section>
      <YourOathsBox oaths={empty} />
    </Section>
  ))
  .add("YourOathsBox - Withdraw Single", () => (
    <Section>
      <YourOathsBox oaths={[withdraw[0]]} />
    </Section>
  ))
  .add("YourOathsBox - Withdraw Double", () => (
    <Section>
      <YourOathsBox oaths={[withdraw[0], withdraw[3]]} />
    </Section>
  ))
  .add("YourOathsBox - Withdraw Multi", () => (
    <Section>
      <YourOathsBox oaths={withdraw} />
    </Section>
  ))
  .add("YourOathsBox - No Withdraw Single", () => (
    <Section>
      <YourOathsBox oaths={[noWithdraw[0]]} />
    </Section>
  ))
  .add("YourOathsBox - No Withdraw Double", () => (
    <Section>
      <YourOathsBox oaths={[noWithdraw[0], noWithdraw[3]]} />
    </Section>
  ))
  .add("YourOathsBox - No Withdraw Multi", () => (
    <Section>
      <YourOathsBox oaths={noWithdraw} />
    </Section>
  ))
  .add("YourOathsBox - Withdraw First", () => (
    <Section>
      <YourOathsBox oaths={oaths2} />
    </Section>
  ))
  .add("YourOathsBox - Long List", () => (
    <Section>
      <YourOathsBox oaths={oaths5} />
    </Section>
  ));
