import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import HoldersFooterBox from "./";

storiesOf("Status", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("HoldersFooterBox", () => <HoldersFooterBox />);
