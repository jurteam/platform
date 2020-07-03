import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import StatusBadge from "./";

storiesOf("Status", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("StatusBadge - Justinian", () => <StatusBadge statusType="justinian" />)
  .add("StatusBadge - Solomon", () => <StatusBadge statusType="solomon" />)
  .add("StatusBadge - Non Holder", () => <StatusBadge />);
