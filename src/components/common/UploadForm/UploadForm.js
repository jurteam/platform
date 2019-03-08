import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PlusCircleIcon} from '../Icons/PlusCircleIcon';

import './UploadForm.scss';
import { BinIcon } from '../Icons/BinIcon';

export class UploadForm extends Component {
  state = {
    files: [{}]
  }

  addFile = ev => {
    ev.preventDefault();
    this.setState(state => {
      const files = state.files;
      files.push({});
      return { files };
    })
  }

  remove = idx => {
    this.setState(state => {
      let files = state.files;
      files.splice(idx, 1);
      files.length === 0 && files.push({});
      this.onChange(files);
      return { files };
    })
  }

  onChange(files) {
    const selectedFiles = files.filter(file => !!file.name);
    this.props.onFileAdded(selectedFiles);
  }

  getSelectedFile = (ev,idx) => {
    const inputFileList = ev.target.files;
    if (inputFileList.length) {
      const selectedFile = inputFileList[0];
      this.setState(state => {
        const files = state.files;
        files[idx] = selectedFile;
        this.onChange(files);
        return { files };
      });
    }
  }

  render() {
    return (
      <div className="jur-upload-form">
        {this.state.files.map((file,idx) => (
          <div className="form-group" key={idx.toString()}>
            <label className="jur-upload-form__label" htmlFor={`input-file-${idx}`}>Choose file</label>
            <input
              className="jur-upload-form__input-file"
              type="file"
              name={`file-${idx}`}
              id={`input-file-${idx}`}
              onChange={ev => this.getSelectedFile(ev, idx)}
            />
            <span className="jur-upload-form__input-name">{file.name || ''}</span>
            <BinIcon onClick={() => this.remove(idx)} />
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