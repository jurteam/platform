import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import AvatarInfo from "../AvatarInfo";
import { JurIcon } from "../Icons/JurIcon";
import { CaretDownIcon } from "../Icons/CaretDownIcon";

import "./Activity.scss";

export const Activity = props => {
  const {
    from: { wallet: walletAddress, name: userName, system: isSystem },
    to,
    status,
    contractStatus,
    abstract
  } = props.data;

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

    if (status === "friendly") {
      _fullAbstract = (
        <>
          {_fullAbstract}
          <span class="jur-activity__abstract--friendly">
            Friendly Resolution
            <CaretDownIcon />
          </span>
        </>
      );
    }

    if (status === "dispute") {
      _fullAbstract = (
        <span className="jur-activity__abstract">
          {_fullAbstract}
          <span class=" jur-activity__abstract--dispute">
            Open Dispute
            <CaretDownIcon />
          </span>
        </span>
      );
    }

    if (status === "expired") {
      _fullAbstract = (
        <span className="jur-activity__abstract">
          {_fullAbstract}
          <span class=" jur-activity__abstract--expired">Open Dispute</span>
        </span>
      );
    }

    return _fullAbstract;
  };

  return (
    <div className="jur-activity">
      {isSystem ? (
        <JurIcon className="jur-activity__avatar" />
      ) : (
        <Avatar
          seed={walletAddress}
          size="large"
          variant="circle"
          className="jur-activity__avatar"
        />
      )}
      <div className="jur-activity__content">
        <div className="jur-activity__content__header">
          <span className="jur-activity__user">
            {userName || walletAddress}
          </span>
          <span className="jur-activity__date">few days ago</span>
        </div>
        <div className="jur-activity__content">
          <div className="jur-activity__description">
            {fullAbstract()}
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

// case -1: // rejected
//   <div><span class="alert">Rejected</span>{abstract}</div>
//   break;
// case 0: // draft
// case 1: // waiting for counterparty
//   <div>{abstract} if sent ? {to}</div>
//   break;
// case 5: // onGoing
//   <div>if paid ? {value}</div>
//   break;
// case 8: // expired rosso
//   <span class="alert">Contract Expired</span>
//   break;
// case 9: // contract closed
//   break;
// case 21: // open friendly resolution
//   <div>Offered<span class="friendly">friendly resolution</span></div>
//   break;
// case 29: // closed friendly resolution
//   break;
// case 31: // Open dispute
//   <div>Created an|sent <span class="dispute">open dispute|dispute proposal</span></div>
//   break;
// case 35: // onGoing dispute 24h
//   break;
// case 36: // extended Dispute 30min
//   break;
// case 38: // expired dispute
//   break;
// case 39: // dispute closed
//   break;
// default:
