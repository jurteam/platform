import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import centered from "@storybook/addon-centered";

import BlockTitle from "./";

storiesOf("BlockTitle", module)
  .addDecorator(withInfo)
  .addDecorator(centered)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Without tooltip", () => <BlockTitle title="Proposal" />)
  .add("With tooltip", () => (
    <BlockTitle
      title="Proposal"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel laoreet augue, eget pellentesque dui posuere"
    />
  ));
