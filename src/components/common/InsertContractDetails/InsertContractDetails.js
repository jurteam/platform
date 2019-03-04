import React from 'react';
import PropTypes from 'prop-types';
import ContractTextarea from '../ContractTextarea';
import UploadForm from '../UploadForm';
import FileList from '../FileList';
import File from '../File';

import './InsertContractDetails.scss';

export const InsertContractDetails = ({kpiInitialValue, resolutionInitialValue, onKpiChange, onResolutionProofChange, onAddFile, uploadedFiles, onView, onDelete}) => {
  return (
    <div className="jur-insert-contract-details">
      <ContractTextarea
        initialValue={kpiInitialValue}
        label="KPI of the contracts:"
        name="kpi"
        onChange={onKpiChange}
      />
      <ContractTextarea
        initialValue={resolutionInitialValue}
        label="Resolution Proof:"
        name="resolution"
        onChange={onResolutionProofChange}
      />
      <div className="jur-insert-contract-details__files">
        {uploadedFiles.length > 0 &&
          <FileList>
            { uploadedFiles.map((file, index) => (
              <File
              key={index.toString()}
                name={file.name}
                onView={onView}
                onDelete={onDelete}
                large
              />
            ))}
          </FileList>
        }
        <UploadForm onAddFile={onAddFile} />
      </div>
    </div>
  );
}
