import React, { useState, useEffect } from 'react';
import Button from 'JurCommon/Button';

import './advocate-bio.scss';
import { ADVOCATE_UPDATE_BIO } from '../../../../reducers/types';
import { updateBio } from '../../../../actions/Advocate';


const AdvocateBio = ({ advocasy, address, updateBioAction }) => {
  const [editBox, setEditBox] = useState(false);
  const [error, setError] = useState();
  const [currentBio, setCurrentBio] = useState(0);
  const [updatedBio, setUpdatedBio] = useState();
  const [currentLength, setCurrentLength] = useState();

  console.log("adressssssssssssss: ", advocasy.bio);


  useEffect(() => {
    setCurrentBio(advocasy.bio);
    setUpdatedBio(advocasy.bio);
  }, [advocasy.bio]);

  const handleEdit = () => {
    setEditBox(!editBox);
  }

  const handleCancel = () => {
    setUpdatedBio(currentBio);
    setEditBox(false);
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
    if(updatedBio !== undefined) {
      updateBioAction(address, updatedBio);
      setEditBox(false);
      // global.store.dispatch({
      //   type: ADVOCATE_UPDATE_BIO,
      //   payload: {address, updatedBio}
      // })
    }
  }

  return (
    <div className="jur-box jur-box__center jur-box__spread-out">
      <div className="jur-bio-box">
        {
          editBox ?
          <>
            <textarea onChange={handleBioChange} className={error ? 'error' : ''}>
              {currentBio}
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
              currentBio ?
              <>
                {currentBio}
              <span className="jur-bio-edit" onClick={handleEdit}>Edit</span>
              </>
              : 
              <div className="jur-bio-add">
                <Button variant="dispute" onClick={handleEdit}>Add bio</Button>
              </div>
            }

          </p>
        }
      </div>
    </div>
  );
}

const updateBioAction = (address, bio) => ({ type: ADVOCATE_UPDATE_BIO, payload: { address, bio } })

const mapDispatchToProps = { updateBioAction }

export default global.connection(AdvocateBio, null, { updateBioAction });
