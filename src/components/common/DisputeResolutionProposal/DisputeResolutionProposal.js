import React from "react";
import PropTypes from "prop-types";
import ProposalPreview from "../ProposalPreview";
import AvatarInfo from "../AvatarInfo";

import "./DisputeResolutionProposal.scss";

export const DisputeResolutionProposal = ({ proposals, onView }) => (
  <div className="jur-dispute-resolution-proposal">
    <div className="jur-dispute-resolution-proposal__title">
      Dispute Resolution Proposal
    </div>
    <div className="jur-dispute-resolution-proposal__proposals">
      {proposals.map(proposal => (
        <div className="jur-dispute-resolution-proposal__proposal">
          <AvatarInfo
            userWallet={proposal.from.wallet}
            size="xlarge"
            type="rounded"
          />
          <ProposalPreview proposalDetail={proposal} onView={onView} />
        </div>
      ))}
    </div>
  </div>
);
