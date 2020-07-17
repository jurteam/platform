import React, { useContext, useState } from "react";

import TimeAgo from "react-timeago";
import Avatar from "../Avatar";
import { JurIcon } from "../Icons/JurIcon";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import ProposalPreview from "../ProposalPreview";
import { ellipsisString } from "../../../utils/helpers";

import "./Activity.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const Activity = ( props ) => {
  let {
    from: { system: isSystem }
  } = props.data;

  const {
    from: { wallet: walletAddress, name: userName },
    date,
    to,
    contract_name,
    status,
    // message,
    abstract
  } = props.data;

  const { hideTime, onView, noPreview } = props;

  const { labels } = useContext(AppContext);

  const getActivityUser = (forced) => {
    if (typeof forced === 'undefined') forced = false;
    if (isSystem || forced) {
      return "Jur System";
    } else {
      return userName || ellipsisString(walletAddress, 16, 16);
    }
  };

  const [isOpen, setOpen] = useState(false);
  const [isNow, setNow] = useState(false);

  const getMessage = () => {
    switch (Number(status)) {
      case 31: // Open Dispute
        return (
          <span
            className={`dispute ${isOpen ? "dispute--open" : ""} ${typeof noPreview === "undefined" ? '' : 'no-pointer'}`}
            onClick={() => setOpen(!isOpen)}
          >
            {/* {`${abstract || labels.createdAn} `} */}
            {`${labels.createdAn} `}
            <span>
              {labels.openDispute}
            </span>
            {typeof noPreview === "undefined" && <CaretDownIcon className="friendly-caret" />}
          </span>
        );

      case 32: // Amend Dispute
        return (
          <span
            className={`dispute ${isOpen ? "dispute--open" : ""} ${typeof noPreview === "undefined" ? '' : 'no-pointer'}`}
            onClick={() => setOpen(!isOpen)}
          >
            {/* {`${abstract || labels.sent} `} */}
            {`${labels.sent} `}
            <span>
              {labels.disputeProposal}
            </span>
            {typeof noPreview === "undefined" && <CaretDownIcon className="friendly-caret" />}
          </span>
        );

        case 35: // Ongoing Dispute
        return (
          <>
             {labels.started}&nbsp;<span className="alert">{labels.votingPhase}</span>
          </>
        );

      case 21: // Open Friendly Resolution
        return (
          <span
            className={`friendly ${isOpen ? "friendly--open" : ""}`}
            onClick={() => setOpen(!isOpen)}
          >
            {/* {`${abstract || labels.offeredA} `} */}
            {`${labels.offeredA} `}
            <span>{`${labels.friendlyResolution}.`}</span>
            {typeof noPreview === "undefined" && <CaretDownIcon className="friendly-caret" />}
          </span>
        );
      case 1: // Waiting for counterparty
        return (
          <>
            {`${labels.sentContractTo}: `}
            <Avatar seed={to.toLowerCase()} size="xsmall" />
            {ellipsisString(to, 16, 16)}
          </>
        );

      case -1: // Rejected
        return (
          <>
            <span className="alert">{labels.rejected}</span> <span className="contract-name">{contract_name}</span>
          </>
        );

      case 8: // Expired
        return (
          <>
            <span className="alert">{labels.contractExpired}</span> <span className="contract-name">{contract_name}</span>
          </>
        );

      // Contract closed
      case 9:
      case 29:
        return (
          <>
            <span className="alert">{labels.contractClosed}</span> <span className="contract-name">{contract_name}</span>
          </>
        );

      // Dispute closed
      case 36:
        return (
          <>
            <span className="alert">{labels.disputeExtended}</span> <span className="contract-name">{labels.for} {contract_name}</span>
          </>
        );

      // Dispute closed
      case 38:
        return (
          <>
            <span className="alert">{labels.disputeExpired}</span> <span className="contract-name">{labels.for} {contract_name}</span>
          </>
        );

      // Dispute closed
      case 39:
        return (
          <>
            <span className="alert">{labels.disputeClosed}</span> <span className="contract-name">{labels.for} {contract_name}</span>
          </>
        );

      case 2:
        return abstract || labels.acceptedContractActivity.replace("%contractName%", contract_name);

      case 5: // TODO: handle statuses
        return abstract || labels.paidContractValueOf.replace("%contractValue%", "600.00");

      default:
        return abstract;
    }
  };
  
  const forceSystem = (status) => {
    switch (status) {
      case 35: return true;
      default: return false;
    };
  }
  
  
  const whatTimeIs = date => {
    const d = new Date();
    const n = d.getTime();
    
    setNow(date >= n)
    if (date >= n) {      
      return date;
    } else {
      return n;
    }

  };

  return (
    <div className="jur-activity">
      <div className="jur-activity__info">
        {isSystem || forceSystem(Number(status)) ? (
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
            <span>{getActivityUser(forceSystem(Number(status)))}</span>

            {!hideTime &&
                <>
                  <span className={`${isNow ? 'hidden' : ''}`}>
                    <TimeAgo date={date} now={() => whatTimeIs(date)} />
                  </span>
                  {isNow && 'now'}
                </>
            }
            
          </div>
          <div className="jur-activity__info__message">{getMessage()}</div>
        </div>
      </div>
      {status !== null && typeof noPreview === "undefined" && (
        <div
          className={`jur-activity__content ${
            isOpen ? "jur-activity__content--open" : ""
          }`}
        >
          <ProposalPreview proposalDetail={props.data} onView={onView} />
        </div>
      )}
    </div>
  );
};
