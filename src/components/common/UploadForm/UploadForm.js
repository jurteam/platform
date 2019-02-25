import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {PlusCircleIcon} from '../Icons/PlusCircleIcon';

import './UploadForm.scss';

export const UploadForm = ({ endpoint }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [addFileLabel, setAddFileLabel] = useState('Add file');

  const upload = ev => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    setAddFileLabel('Loading...');

    setTimeout(() => {
      setAddFileLabel('Add file');
    }, 2000);
    // fetch(endpoint, {
    //   method: 'POST',
    //   cors: true,
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    //   body: formData,
    // })
    // .then(response => console.log(response));
  };

  const getSelectedFile = ev => {
    const files = ev.target.files;
    if (files.length) {
      const file = files[0];
      setFile(file);
      setFileName(file.name);
    }
  }

  return (
    <form className="jur-upload-form" onSubmit={upload}>
      <div className="form-group">
        <label className="jur-upload-form__label" htmlFor="input-file">Choose file</label>
        <input
          className="jur-upload-form__input-file"
          type="file"
          name="file"
          id="input-file"
          onChange={getSelectedFile}
        />
        <input
          className="jur-upload-form__input-name"
          type="text"
          defaultValue={fileName}
          readOnly
        />
      </div>
      <button>
        <PlusCircleIcon />
        {addFileLabel}
      </button>
    </form>
  );
}