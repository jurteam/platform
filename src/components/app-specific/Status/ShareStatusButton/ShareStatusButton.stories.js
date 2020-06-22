import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ShareStatusButton from "./";

storiesOf("Status", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("ShareStatusButton", () => <ShareStatusButton />);
