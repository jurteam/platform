import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Cover from "./";

storiesOf("Cover", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("Plain", () => <Cover>A text line inside plain cover</Cover>);
