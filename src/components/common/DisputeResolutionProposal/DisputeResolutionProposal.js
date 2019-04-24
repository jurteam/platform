import React, { useContext } from "react";
import ProposalPreview from "../ProposalPreview";
import AvatarInfo from "../AvatarInfo";

import "./DisputeResolutionProposal.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const DisputeResolutionProposal = ({ proposals, onView }) => {
  const { labels } = useContext(AppContext);
  return (
    <div className="jur-dispute-resolution-proposal">
      <div className="jur-dispute-resolution-proposal__title">
        {labels.disputeResolutionProposal}
      </div>
      <div className="jur-dispute-resolution-proposal__proposals">
        {proposals.map(proposal => (
          <div className="jur-dispute-resolution-proposal__proposal">
            <AvatarInfo
              userWallet={proposal.from.wallet.toLowerCase()}
              size="xlarge"
              type="rounded"
            />
            <ProposalPreview proposalDetail={proposal} onView={onView} />
          </div>
        ))}
      </div>
    </div>
  );
};
