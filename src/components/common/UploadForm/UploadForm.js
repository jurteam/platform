import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PlusCircleIcon} from '../Icons/PlusCircleIcon';

import './UploadForm.scss';

export class UploadForm extends Component {
  state = {
    filesLength: 1,
    files: []
  }

  addFile = ev => {
    ev.preventDefault();
    this.setState(state => ({
      filesLength: state.filesLength + 1
    }))
  }

  getSelectedFile = ev => {
    const inputFileList = ev.target.files;
    if (inputFileList.length) {
      const selectedFile = inputFileList[0];
      ev.target.nextSibling.value = selectedFile.name;
      this.setState(state => {
        const files = [...state.files, selectedFile];
        this.props.onAddFile(files);
        return { files };
      });
    }
  }

  render() {
    return (
      <div className="jur-upload-form">
        {[...Array(this.state.filesLength)].map((item,idx) => (
          <div className="form-group" key={idx.toString()}>
            <label className="jur-upload-form__label" htmlFor={`input-file-${idx}`}>Choose file</label>
            <input
              className="jur-upload-form__input-file"
              type="file"
              name={`file-${idx}`}
              id={`input-file-${idx}`}
              onChange={this.getSelectedFile}
            />
            <input
              className="jur-upload-form__input-name"
              type="text"
              defaultValue=""
              readOnly
            />
          </div>  
        ))}
        <button onClick={this.addFile}>
          <PlusCircleIcon />
          Add File
        </button>
      </div>
    );
  }
}