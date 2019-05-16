import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Countdown from "./";

storiesOf("Countdown", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Rejected", () => (
    <Countdown
      days={2}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={-1}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Draft", () => (
    <Countdown
      days={2}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={0}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Waiting For Counterparty", () => (
    <Countdown
      days={2}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={1}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("OnGoing", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
<<<<<<< HEAD
      startDate={1552997513000}
=======
      startDate="May 24, 2019 23:30:00"
>>>>>>> 19ff0efeca44af112493a3c49a02e7a9c8cb20cb
      statusId={5}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Expired", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={8}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Contract Closed", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={9}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Open Friendly resolution", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={21}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Closed Friendly resolution", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={29}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Open Dispute", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate="May 24, 2019 23:30:00"
      statusId={31}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("OnGoing Dispute", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={35}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Extended Dispute", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={36}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Expired Dispute", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={38}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add("Dispute Closed", () => (
    <Countdown
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={39}
      expireAlertFrom={1000 * 60 * 60 * 24}
      onProgress={percentage => console.log(percentage)}
    />
  ));
