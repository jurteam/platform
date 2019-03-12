import React from 'react'
import PropTypes from 'prop-types'
import ContractAccordion from '../ContractAccordion';
import {urlify} from '../../../utils/helpers';
import FileList from '../FileList';
import File from '../File';
import './DisputeMainAccordions.scss';

export const DisputeMainAccordions = ({details, files, onView}) => {
  return (
    <div className="jur-dispute-main-accordions">
      {Object.keys(details).map(detail => (
        <ContractAccordion title={details[detail].label} key={details[detail].label}>
          <div
            className="jur-dispute-main-accordions__content"
            dangerouslySetInnerHTML={{__html: urlify(details[detail].message)}}
          />
        </ContractAccordion>
      ))}
      <ContractAccordion title="Attachments">
          <div className="jur-dispute-main-accordions__content">
            <FileList>
              {files.map(file => (
                <File
                  key={file.name}
                  name={file.name}
                  onView={onView}
                  large
                />
              ))}
            </FileList>
          </div>
        </ContractAccordion>
    </div>
  );
}