import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import Avatar from "../Avatar";
import AvatarInfo from "../AvatarInfo";
import { JurIcon } from "../Icons/JurIcon";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import ProposalPreview from "../ProposalPreview";
import { ellipsisString } from "../../../utils/helpers";

import "./Activity.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const Activity = props => {
  const {
    from: { wallet: walletAddress, name: userName, system: isSystem },
    date,
    to,
    contract_name,
    status,
    message,
    abstract
  } = props.data;

  const { labels } = useContext(AppContext);

  const fullAbstract = () => {
    let _fullAbstract = abstract;
    if (
      !status &&
      abstract
        .toLowerCase()
        .toString()
        .startsWith("sent")
    ) {
      _fullAbstract = (
        <span className="jur-activity__abstract">
          {_fullAbstract}
          <AvatarInfo userWallet={to} variant="ellipsis" />
        </span>
      );
    }
  };

  const getActivityUser = () => {
    if (isSystem) {
      return "Jur System";
    } else {
      return userName || ellipsisString(walletAddress, 16, 16);
    }
  };

  const [isOpen, setOpen] = useState(false);

  const getMessage = () => {
    if (isSystem) {
      return <span className="alert">{abstract}</span>;
    } else {
      switch (Number(status)) {
        case 31: // Open Dispute
          return (
            <span
              className={`dispute ${isOpen ? "dispute--open" : ""}`}
              onClick={() => setOpen(!isOpen)}
            >
              {`${abstract || labels.createdAn} `}
              <span>
                {labels.openDispute}
              </span>
              <CaretDownIcon className="friendly-caret" />
            </span>
          );

        case 35: // Ongoing Dispute
          return (
            <span
              className={`dispute ${isOpen ? "dispute--open" : ""}`}
              onClick={() => setOpen(!isOpen)}
            >
              {`${abstract || labels.sent} `}
              <span>
                {labels.disputeProposal}
              </span>
              <CaretDownIcon className="friendly-caret" />
            </span>
          );

        case 21: // Open Friendly Resolution
          return (
            <span
              className={`friendly ${isOpen ? "friendly--open" : ""}`}
              onClick={() => setOpen(!isOpen)}
            >
              {`${abstract || labels.offeredA} `}
              <span>{`${labels.friendlyResolution}.`}</span>
              <CaretDownIcon className="friendly-caret" />
            </span>
          );
        case 1: // Waiting for counterparty
          return (
            <>
              {`${abstract || labels.sentContractTo}: `}
              <Avatar seed={to.toLowerCase()} size="xsmall" />
              {ellipsisString(to, 16, 16)}
            </>
          );

        case -1: // Rejected
          return (
            <>
              <span className="alert">{labels.rejected}</span> {contract_name}
            </>
          );

        // Contract closed
        case 9:
        case 29:
          return (
            <>
              <span className="alert">{labels.contractClosed}</span> {contract_name}
            </>
          );

        case 2:
          return abstract || labels.acceptedContractActivity.replace("%contractName%", contract_name);

        case 5: // TODO: handle statuses
          return abstract || labels.paidContractValueOf.replace("%contractValue%", "600.00");

        default:
          return abstract;
      }
    }
  };

  return (
    <div className="jur-activity">
      <div className="jur-activity__info">
        {isSystem ? (
          <JurIcon className="jur-activity__info__avatar" />
        ) : (
          <Avatar
            seed={walletAddress.toLowerCase()}
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
      {status !== null && message && (
        <div
          className={`jur-activity__content ${
            isOpen ? "jur-activity__content--open" : ""
          }`}
        >
          <ProposalPreview proposalDetail={props.data} />
        </div>
      )}
    </div>
  );
};
