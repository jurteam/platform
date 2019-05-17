import React, { useContext, useState } from "react";

import { PlusCircleIcon } from "../Icons/PlusCircleIcon";

import "./UploadForm.scss";
import { BinIcon } from "../Icons/BinIcon";
import { AppContext } from "../../../bootstrap/AppProvider";

export const UploadForm = props => {
  let inputs = [];
  const [state, setState] = useState({
    files: [{}]
  });

  const addFile = (ev) => {
    ev.preventDefault();
    setState(state => {
      const files = state.files;
      files.push({});
      return { files };
    });
  };

  const remove = (idx) => {
    setState(state => {
      let files = state.files;
      inputs[idx].value = "";
      files.splice(idx, 1);
      files.length === 0 && files.push({});
      onChange(files);
      return { files };
    });
  };

  const onChange = (files) => {
    const selectedFiles = files.filter(file => !!file.name);
    props.onFileAdded(selectedFiles);
  };

  const getSelectedFile = (ev, idx) => {
    const inputFileList = ev.target.files;
    if (inputFileList.length) {
      const selectedFile = inputFileList[0];
      setState(state => {
        const files = state.files;
        files[idx] = selectedFile;
        onChange(files);
        return { files };
      });
    }
  };

  const { labels } = useContext(AppContext);

  return (
    <div
      className={`jur-upload-form ${
        props.disabled ? "jur-upload-form__disabled" : ""
      }`}
    >
      {state.files.map((file, idx) => (
        <div className="form-group" key={idx.toString()}>
          <label
            className="jur-upload-form__label"
            htmlFor={`input-file-${idx}`}
          >
            {labels.chooseFile}
          </label>
          <input
            ref={(ref) => (inputs[idx] = ref)}
            className="jur-upload-form__input-file"
            type="file"
            name={`file-${idx}`}
            id={`input-file-${idx}`}
            disabled={props.disabled}
            onChange={(ev) => getSelectedFile(ev, idx)}
          />
          <span className="jur-upload-form__input-name">{file.name || ""}</span>
          <BinIcon onClick={() => remove(idx)} />
        </div>
      ))}
      <button onClick={addFile}>
        <PlusCircleIcon />
        {labels.addFile}
      </button>
    </div>
  );
};
