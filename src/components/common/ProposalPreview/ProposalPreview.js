import React, { useContext } from "react";
import FileList from "../FileList";
import File from "../File";
import BlockTitle from "../BlockTitle";
import Avatar from "../Avatar";
import Amount from "../Amount";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ProposalPreview.scss";

export const ProposalPreview = props => {
  const { proposalDetail, onView } = props;
  const { proposal } = proposalDetail;
  const contractValue = Number(proposal.part_a) + Number(proposal.part_b);

  const calcPercentage = val => {
    return Math.round((Number(val) / contractValue) * 100, 2);
  };

  const { labels } = useContext(AppContext);

  return (
    <div className="jur-proposal-preview">
      <div className="jur-proposal-preview__message">
        {proposalDetail.message}
      </div>
      <div className="jur-proposal-preview__proposes">
        {Object.keys(proposal).map(part => (
          <div key={part} className="jur-proposal-preview__proposal">
            <Avatar
              seed={proposalDetail[part].toLowerCase()}
              size="small"
              variant="circle"
            />
            <div className="jur-proposal-preview__proposal__value">
              <Amount value={proposal[part]} />
              <span>
                {calcPercentage(proposal[part])}
                {labels.percentageOfTotalValue}
              </span>
            </div>
          </div>
        ))}
      </div>
      {proposalDetail.attachments && proposalDetail.attachments.length > 0 && (
        <div className="jur-proposal-preview__evidences">
          <BlockTitle title={labels.evidences} hideIcon />
          <FileList>
            {proposalDetail.attachments.map((file, index) => (
              <File key={`pf-${file.fileName}${index.toString()}`} file={file} name={file.fileName} onView={onView} />
            ))}
          </FileList>
        </div>
      )}
    </div>
  );
};
