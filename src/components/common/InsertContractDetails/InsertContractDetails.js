import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContractTextarea from "../ContractTextarea";
import UploadForm from "../UploadForm";
import FileList from "../FileList";
import File from "../File";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

import "./InsertContractDetails.scss";

export const InsertContractDetails = ({
  disabled,
  kpiPlaceholder,
  resolutionProofPlaceholder,
  kpiInitialValue,
  resolutionProofInitialValue,
  onKpiChange,
  onResolutionProofChange,
  onFileAdded,
  uploadedFiles,
  onView,
  onDelete
}) => {
  const { labels } = useContext(AppContext);

  return (
    <div className="jur-insert-contract-details">
      <ContractTextarea
        initialValue={kpiInitialValue}
        label={`${labels.kpi}:`}
        name="kpi"
        onChange={onKpiChange}
        placeholder={kpiPlaceholder}
        disabled={disabled}
      />
      <ContractTextarea
        initialValue={resolutionProofInitialValue}
        label={`${labels.resolutionProof}:`}
        name="resolutionProof"
        onChange={onResolutionProofChange}
        placeholder={resolutionProofPlaceholder}
        disabled={disabled}
      />
      <div className="jur-insert-contract-details__files">
        {uploadedFiles.length > 0 && (
          <FileList>
            {uploadedFiles.map((file, index) => (
              <File
                key={index.toString()}
                name={file.fileName}
                file={file}
                onView={onView}
                onDelete={onDelete}
                disabled={disabled}
                large
              />
            ))}
          </FileList>
        )}
        <UploadForm onFileAdded={onFileAdded} disabled={disabled} />
      </div>
    </div>
  );
};
