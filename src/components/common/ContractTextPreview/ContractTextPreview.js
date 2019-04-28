import React from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";
import { urlify } from "../../../utils/helpers";

import "./ContractTextPreview.scss";

export const ContractTextPreview = props => {
  const processedMessage = urlify(props.message);
  return (
    <div className="jur-contract-text-preview">
      <BlockTitle title={props.label} hideIcon />
      <div
        className="jur-contract-text-preview__message"
        dangerouslySetInnerHTML={{ __html: processedMessage }}
      />
    </div>
  );
};
