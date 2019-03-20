import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractTextPreview from "./";

storiesOf("ContractTextPreview", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractTextPreview
      label="Resolution Proof:"
      message="0x55fe002aeff02f77364de339a1292923a15844b8 should upload all the deliverables in the Google Drive folder at the following link http://goo.gl/logo-design , which will be made public in case of dispute. Oracles would be able to see each deliverable and can also check email extracts between the parties for the revisions requested"
    />
  ));
