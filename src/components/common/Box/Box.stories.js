import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Box from "./";

storiesOf("Box", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Sample", () => (
    <Box title="A Sample Box">
      A `Box` is container componet for styling purpose. It provides generic
      padding and a uniform title display. It also has borders for separating if
      from the adjacent boxes. It uses html element section.
    </Box>
  ))
  .add("Loading", () => (
    <Box isLoading={true} title="Loading childrens">
      A Box can take optional isLoading prop. When isLoading is true, the
      children won't be rendered.
    </Box>
  ))
  .add("Type - Hero", () => (
    <Box type="hero" title="A Hero Box">
      This is a hero box. Contents will be centered and has a bottom border.
    </Box>
  ))
  .add("Type - Header", () => (
    <Box type="header" title="A Header Box">
      This is a header box. Has a bottom border.
    </Box>
  ))
  .add("Type - Footer", () => (
    <Box type="footer" title="A Footer Box">
      This is a footer box. Contents are centered and has a top border.
    </Box>
  ))
  .add("Type - Message", () => (
    <Box>
      <Box type="message" title="A Message Box">
        This is a message box. Has a top and bottom border. Contents are
        centered. Padding is a bit smaller and has margin offsets. It's meant to
        be used inside another Box.
      </Box>
      Other contents in the parent Box
    </Box>
  ));
