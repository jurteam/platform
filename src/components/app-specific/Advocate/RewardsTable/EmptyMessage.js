import React from "react";
import Table from "JurCommon/Table";
import Text from "JurCommon/Text";
import { NoIcon } from "JurCommon/Icons";
import { mapLabelsToProps } from "../../../../utils/helpers";

const EmptyMessage = ({ isShown, isPublic, labels }) =>
  isShown ? (
    <Table.Row>
      <Table.Cell colSpan={5}>
        <Text className="jur-text__center">
          <NoIcon className="icon-24" />
        </Text>
        <Text className="jur-text__center">{message(isPublic, labels)}</Text>
      </Table.Cell>
    </Table.Row>
  ) : null;

function message(isPublic, labels) {
  return isPublic ? labels.noRewardMessage : labels.noYourRewardMessage;
}

export default global.connection(EmptyMessage, mapLabelsToProps);
