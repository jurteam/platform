import React from 'react';
import PropTypes from 'prop-types';
import FileList from '../FileList';
import File from '../File';
import BlockTitle from '../BlockTitle';
import Avatar from '../Avatar';
import Amount from '../Amount';

import './ProposalPreview.scss';


export const ProposalPreview = ({proposalDetail, onView}) => (
  <div className="jur-proposal-preview">
    <div className="jur-proposal-preview__message">{proposalDetail.message}</div>
    <div className="jur-proposal-preview__proposes">
      {Object.keys(proposalDetail.proposal).map(part => (
        <div key={part} className="jur-proposal-preview__proposal">
          <Avatar seed={proposalDetail[part]} size="small" variant="circle" />
          <div className="jur-proposal-preview__proposal__value">
            <Amount value={proposalDetail.proposal[part].value} />
            <span>{proposalDetail.proposal[part].percentage}% of Total value</span>
          </div>
        </div>
      ))}
    </div>
    <div className="jur-proposal-preview__evidences">
      {proposalDetail.evidences && proposalDetail.evidences.length > 0 &&
        <>
          <BlockTitle title="Evidences" hideIcon/>
          <FileList>
            {proposalDetail.evidences.map(file =>(
              <File
                key={file.name}
                name={file.name}
                onView={onView}
              />
            ))}
          </FileList>
        </>
      }
    </div>
  </div>
);