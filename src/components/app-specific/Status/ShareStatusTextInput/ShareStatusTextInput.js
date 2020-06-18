import React from "react";
import "./ShareStatusTextInput.scss";

import Form from "JurCommon/Form";
import { STATUS_CHANGE_SHARE_TEXT } from "../../../../reducers/types";
import { getShareText } from "../../../../sagas/Selectors";

const ShareStatusTextInput = ({ onChange, value }) => (
  <Form.TextArea rows={4} value={value} onChange={onChange} />
);

const onChange = v => ({ type: STATUS_CHANGE_SHARE_TEXT, payload: v });

const mapDispatchToProps = { onChange };
const mapStateToProps = state => ({ value: getShareText(state) });

export default global.connection(
  ShareStatusTextInput,
  mapStateToProps,
  mapDispatchToProps
);
