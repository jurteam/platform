import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ProfilePreview from ".";

storiesOf("ProfilePreview", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("shouldRenderName is true", () => (
    <ProfilePreview
      to="/profile"
      name="Alice"
      seed="0x3954939439487573664374"
      balance="7546857"
      shouldRenderName
    />
  ))
  .add("shouldRenderName is true and No name available", () => (
    <ProfilePreview
      to="/profile"
      seed="0x3954939439487573664374"
      balance="7546857"
      shouldRenderName
    />
  ))
  .add("shouldRenderName is false", () => (
    <ProfilePreview
      to="/profile"
      name="Alice"
      seed="0x3954939439487573664374"
      balance="7546857"
    />
  ));
