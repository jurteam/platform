import React from "react";
import "./SocialNetworkInput.scss";

import { FacebookIcon, TwitterIcon, LinkedInIcon } from "JurCommon/Icons";
import RadioInputRow from "JurCommon/RadioInputRow";
import { SOCIAL_NETWORK_OPTIONS } from "JurUtils/AdvocateHelpers";
import { getShareNetwork } from "../../../../sagas/Selectors";
import { ADVOCATE_CHANGE_SHARE_NETWORK } from "../../../../reducers/types";

const onChange = option => ({
  type: ADVOCATE_CHANGE_SHARE_NETWORK,
  payload: { value: option.value }
});

const valueToLabel = (value, fill = "#dcdcdc") =>
  ({
    facebook: <FacebookIcon fill={fill} className="icon-24 icon-clickable" />,
    twitter: <TwitterIcon fill={fill} className="icon-24 icon-clickable" />,
    linkedIn: <LinkedInIcon fill={fill} className="icon-24 icon-clickable" />
  }[value]);

const mapLabel = option => ({ ...option, label: valueToLabel(option.value) });
const mapActiveLabel = option => ({
  ...option,
  label: valueToLabel(option.value, "#0077ff")
});

const mapLabels = (options, selected) =>
  options.map(o =>
    o.value === selected.value ? mapActiveLabel(o) : mapLabel(o)
  );

const SocialNetworkInput = ({ onChange, selected }) => {
  return (
    <RadioInputRow
      className="jur-social-network-input"
      options={mapLabels(SOCIAL_NETWORK_OPTIONS, selected)}
      selected={selected}
      onChange={onChange}
    />
  );
};

const mapStateToProps = state => ({ selected: getShareNetwork(state) });
const mapDispatchToProps = { onChange };

export default global.connection(
  SocialNetworkInput,
  mapStateToProps,
  mapDispatchToProps
);
