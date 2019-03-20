import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import FileList from "./";
import File from "../File";

storiesOf("FileList", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default ", () => (
    <FileList>
      <File
        name="Freelance Agreement - Logo Design - 0x55fe002aeff02f77364de339a1292923a15844b8.pdf"
        onView={() => alert("view action fired")}
      />
      <File
        name="Freelance Agreement - Logo Design - 0x55fe002aeff02f77364de339a1292923a15844b8.pdf"
        onView={() => alert("view action fired")}
      />
    </FileList>
  ))
  .add("Large", () => (
    <FileList>
      <File
        name="Freelance Agreement - Logo Design - 0x55fe002aeff02f77364de339a1292923a15844b8.pdf"
        onView={() => alert("view action fired")}
        onDelete={() => alert("delete action fired")}
        large
      />
      <File
        name="Freelance Agreement - Logo Design - 0x55fe002aeff02f77364de339a1292923a15844b8.pdf"
        onView={() => alert("view action fired")}
        onDelete={() => alert("delete action fired")}
        large
      />
    </FileList>
  ));
