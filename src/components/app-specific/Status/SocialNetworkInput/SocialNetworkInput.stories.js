import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import SocialNetworkInput from "./";

storiesOf("Status", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("SocialNetworkInput", () => <SocialNetworkInput />);
