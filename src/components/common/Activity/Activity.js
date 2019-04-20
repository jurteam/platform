import React, {useState} from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import AvatarInfo from "../AvatarInfo";
import { JurIcon } from "../Icons/JurIcon";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import TimeAgo from "../TimeAgo";
import ProposalPreview from "../ProposalPreview";
import { ellipsisString } from "../../../utils/helpers";

import "./Activity.scss";

export const Activity = props => {
  const {
    from: { wallet: walletAddress, name: userName, system: isSystem },
    date,
    to,
    status,
    abstract,
    message
  } = props.data;

  const getActivityUser = () => {
    if(isSystem) {
      return "Jur System";
    } else {
      return userName || ellipsisString(walletAddress, 16, 16);
    }
  };

  const [isOpen, setOpen] = useState(false);

  const getMessage = () => {
    if (isSystem) {
      return (<span className="alert">{abstract}</span>);
    } else {
      if (status === "dispute") {
        return (
          <span
            className={`dispute ${isOpen ? "dispute--open" : ""}`}
            onClick={() => setOpen(!isOpen)}
          >
            {abstract}
            <span>
              {abstract.toLowerCase().startsWith("created an") ? "Open Dispute" : "Dispute Proposal"}
            </span>
            <CaretDownIcon className="friendly-caret"/>
          </span>
        );
      }
      else if (status === "friendly") {
        return (
          <span
            className={`friendly ${isOpen ? "friendly--open" : ""}`}
            onClick={() => setOpen(!isOpen)}
          >
            {abstract}
            <span>Friendly Resolution.</span>
            <CaretDownIcon className="friendly-caret"/>
          </span>
        );
      }
      else if (status === null && abstract.toLowerCase().startsWith("sent contract")) {
        return (
          <>
            {abstract}
            <Avatar seed={to} size="xsmall" />
            {ellipsisString(to, 16, 16)}
          </>
        );
      }
      else if (status === null && abstract.toLowerCase().startsWith("rejected")) {
        return (
          <>
          <span className="alert">Rejected</span>
          {abstract.slice("rejected".length)}
          </>
        );
      }
      else {
        return abstract;
      };
    }
  };

  return (
    <div className="jur-activity">
      <div className="jur-activity__info">
        {isSystem ? (
          <JurIcon className="jur-activity__info__avatar" />
        ) : (
          <Avatar
            seed={walletAddress}
            size="large"
            variant="circle"
            className="jur-activity__info__avatar"
          />
        )}
        <div className="jur-activity__info__details">
          <div className="jur-activity__info__from">
            <span>{getActivityUser()}</span>
            <TimeAgo date={date} />
          </div>
          <div className="jur-activity__info__message">{getMessage()}</div>
        </div>
      </div>
      {status !== null && message &&
        <div className={`jur-activity__content ${isOpen ? "jur-activity__content--open" : ""}`}>
          <ProposalPreview proposalDetail={props.data} />
        </div>
      }
    </div>
  );
};
