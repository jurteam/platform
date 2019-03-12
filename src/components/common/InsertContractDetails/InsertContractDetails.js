import React from 'react';
import PropTypes from 'prop-types';
import ContractTextarea from '../ContractTextarea';
import UploadForm from '../UploadForm';
import FileList from '../FileList';
import File from '../File';

import './InsertContractDetails.scss';

export const InsertContractDetails = ({kpiPlaceholder, resolutionPlaceholder, kpiInitialValue, resolutionInitialValue, onKpiChange, onResolutionProofChange, onFileAdded, uploadedFiles, onView, onDelete}) => {
  return (
    <div className="jur-insert-contract-details">
      <ContractTextarea
        initialValue={kpiInitialValue}
        label="KPI of the contracts:"
        name="kpi"
        onChange={onKpiChange}
        placeholder={kpiPlaceholder}
      />
      <ContractTextarea
        initialValue={resolutionInitialValue}
        label="Resolution Proof:"
        name="resolution"
        onChange={onResolutionProofChange}
        placeholder={resolutionPlaceholder}
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
        <UploadForm onFileAdded={onFileAdded} />
      </div>
    </div>
  );
}
