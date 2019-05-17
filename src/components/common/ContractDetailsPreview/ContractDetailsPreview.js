import React from "react";
import ContractTextPreview from "../ContractTextPreview";
import FileList from "../FileList";
import File from "../File";

import "./ContractDetailsPreview.scss";

export const ContractDetailsPreview = ( props ) => {
  const { contract, onView, onDelete } = props;
  return (
    <div className="jur-contract-details-preview">
      {contract.details &&
        Object.keys(contract.details).map((key, index) => (
          <ContractTextPreview
            key={index.toString()}
            label={contract.details[key].label}
            message={contract.details[key].message}
          />
        ))}
      {contract.files && contract.files.length > 0 && (
        <FileList>
          {contract.files.map((file, index) => (
            <File
              key={index.toString()}
              name={file.name}
              onView={onView}
              onDelete={onDelete}
              large
            />
          ))}
        </FileList>
      )}
    </div>
  );
};
