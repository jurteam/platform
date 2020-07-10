import React from "react";
import Table from "JurCommon/Table";
import Text from "JurCommon/Text";
import { NoIcon } from "JurCommon/Icons";

export default ({ isShown }) =>
  isShown ? (
    <Table.Row>
      <Table.Cell colSpan={5}>
        <Text className="jur-text__center">
          <NoIcon className="icon-24" />
        </Text>
        <Text className="jur-text__center">
          You did not earn any reward so far. If you want to contribute to Jur's
          mission please check the Activities section.
        </Text>
      </Table.Cell>
    </Table.Row>
  ) : null;
