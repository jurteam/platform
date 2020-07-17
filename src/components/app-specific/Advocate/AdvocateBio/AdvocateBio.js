import React, { useState, useEffect } from 'react';
import Button from 'JurCommon/Button';

import './advocate-bio.scss';
import { ADVOCATE_UPDATE_BIO } from '../../../../reducers/types';
import { updateBio } from '../../../../actions/Advocate';


const AdvocateBio = ({ bio, address }) => {
  const [edit, setEdit] = useState(true);
  const [error, setError] = useState();
  const [currentBio, setCurrentBio] = useState(0);
  const [updatedBio, setUpdatedBio] = useState();
  const [currentLength, setCurrentLength] = useState();

  useEffect(() => {
    setCurrentBio(bio);
    setUpdatedBio(bio);
  }, [bio]);

  const handleEdit = () => {
    setEdit(!edit);
  }

  const handleCancel = () => {
    setUpdatedBio(bio);
    setEdit(false);
  }

  const handleBioChange = (e) => {
    let value = e.target.value;


    if(value.length > 1000 || value.length === "") {
      setError(true);
      setCurrentLength(value.length);
    } else {
      setUpdatedBio(value);
      setError(false);
    }
  }

  const handleUpdate = () => {
    console.log("updatedBio: ", updatedBio);
    if(updatedBio !== undefined) {
      global.store.dispatch({
        type: ADVOCATE_UPDATE_BIO,
        payload: {address, updatedBio}
      })
    }
  }

  return (
    <div className="jur-box jur-box__center jur-box__spread-out">
      <div className="jur-bio-box">
        {
          edit ?
          <>
            <textarea onChange={handleBioChange} className={error ? 'error' : ''}>
              {updatedBio}
            </textarea>
            <div className="jur-bio-actions">
              <div>
                {
                  error ?
                  <span className="error-info">
                    {currentLength} out of 1000 characters. <strong>Please shorten the bio.</strong>
                  </span>
                  : null
                }
              </div>

              <div className="jur-bio-btn">
                <Button variant="outlined" color="dispute" onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" color="dark-blue" onClick={handleUpdate} disabled={error}>Save</Button>
              </div>
            </div>
          </>
          :
          <p className="jur-bio-text">
            {
              updatedBio ?
              <>
                {updatedBio}
              <span className="jur-bio-edit" onClick={handleEdit}>Edit</span>
              </>
              : null
            }

          </p>
        }
      </div>
    </div>
  );
}


export default AdvocateBio;
