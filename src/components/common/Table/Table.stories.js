import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Table from "./";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableHead from "../TableHead";
import TableBody from "../TableBody";

storiesOf("Table", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("No Styles", () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Jur</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ))
  .add("Click on thead cell to sort", () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell onClick={(e, desc) => alert(desc)}>
            Name (click me to sort)
          </TableCell>
          <TableCell>Age</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Jur</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ));
