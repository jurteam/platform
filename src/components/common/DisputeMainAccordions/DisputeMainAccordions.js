import React, { useContext } from "react";
import ContractAccordion from "../ContractAccordion";
import { urlify } from "../../../utils/helpers";
import FileList from "../FileList";
import File from "../File";
import "./DisputeMainAccordions.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const DisputeMainAccordions = ({ details, files, onView }) => {
  const { labels } = useContext(AppContext);
  return (
    <div className="jur-dispute-main-accordions">
      {Object.keys(details).map(detail => (
        <ContractAccordion
          title={details[detail].label}
          key={details[detail].label}
        >
          <div
            className="jur-dispute-main-accordions__content"
            dangerouslySetInnerHTML={{
              __html: urlify(details[detail].message)
            }}
          />
        </ContractAccordion>
      ))}
      {files.length > 0 && (
        <ContractAccordion title={labels.attachments}>
          <div className="jur-dispute-main-accordions__content">
            <FileList>
              {files.map((file, index) => (
                <File
                  key={index.toString()}
                  name={file.fileName}
                  file={file}
                  onView={onView}
                  large
                />
              ))}
            </FileList>
          </div>
        </ContractAccordion>
      )}
    </div>
  );
};
