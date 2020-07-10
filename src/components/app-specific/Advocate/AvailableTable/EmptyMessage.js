import React from "react";
import Table from "JurCommon/Table";
import Text from "JurCommon/Text";
import { NoIcon } from "JurCommon/Icons";

export default ({ isShown }) =>
  isShown ? (
    <Table.Row>
      <Table.Cell colSpan={3}>
        <Text className="jur-text__center">
          <NoIcon className="icon-24" />
        </Text>
        <Text className="jur-text__center">
          There are no available activities at the moment. Stay tuned on the{" "}
          <a href="https://t.me/jurcommunity" target="_blank">
            Jur Official Community
          </a>{" "}
          for updates.
        </Text>
      </Table.Cell>
    </Table.Row>
  ) : null;
