import React, { useState, useEffect } from "react";
import Button from "JurCommon/Button";
import Box from "JurCommon/Box";

import "./advocate-bio.scss";
import { ADVOCATE_UPDATE_BIO } from "../../../../reducers/types";
import { isMyProfile } from "../../../../utils/AdvocateHelpers";

const MAX_CONTENT_LENGTH = 1000;

const AdvocateBio = ({ advocasy, address, updateBioAction }) => {
  const currentUser = global.store.getState().user.wallet;

  console.log(
    "adressssssssss: ",
    currentUser.toLowerCase() === address.toLowerCase()
  );

  const [editBox, setEditBox] = useState(false);
  const [error, setError] = useState();
  const [currentBio, setCurrentBio] = useState();
  const [updatedBio, setUpdatedBio] = useState();
  const [currentLength, setCurrentLength] = useState();

  useEffect(() => {
    setCurrentBio(advocasy.bio);
    setUpdatedBio(advocasy.bio);
  }, [advocasy.bio]);

  const handleEdit = () => {
    setEditBox(!editBox);
  };

  const handleCancel = () => {
    setUpdatedBio(currentBio);
    setEditBox(false);
  };

  const handleBioChange = e => {
    let value = e.target.value;

    if (value.length > 1000 || value.length === "") {
      setError(true);
      setCurrentLength(value.length);
    } else {
      setUpdatedBio(value);
      setError(false);
    }
  };

  const handleUpdate = () => {
    if (updatedBio !== undefined) {
      updateBioAction(address, updatedBio);
      setEditBox(false);
      // global.store.dispatch({
      //   type: ADVOCATE_UPDATE_BIO,
      //   payload: {address, updatedBio}
      // })
    }
  };

  const loggedInUser = () => {
    return currentUser.toLowerCase() === address.toLowerCase();
  };

  return (
    <Box types="spread-out center">
      <div className="jur-bio-box">
        {editBox && loggedInUser() ? (
          <>
            <textarea
              onChange={e => {
                handleBioChange(e);
              }}
              className={error ? "error" : ""}
            >
              {currentBio}
            </textarea>
            <div className="jur-bio-actions">
              <div>
                {error ? (
                  <span className="error-info">
                    {currentLength} out of {MAX_CONTENT_LENGTH} characters.{" "}
                    <strong>Please shorten the bio.</strong>
                  </span>
                ) : null}
              </div>

              <div className="jur-bio-btn">
                <Button
                  variant="outlined"
                  color="dispute"
                  onClick={e => {
                    handleCancel(e);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="dark-blue"
                  onClick={e => {
                    handleUpdate(e);
                  }}
                  disabled={error}
                >
                  Save
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="jur-bio-text">
            {currentBio && loggedInUser() ? (
              <>
                {currentBio}
                <span
                  className="jur-bio-edit"
                  onClick={e => {
                    handleEdit(e);
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.6705 3.33004L10.3451 4.65542L7.34461 1.65497L8.66999 0.329589C9.10945 -0.109863 9.82218 -0.109863 10.2616 0.329589L11.6705 1.7384C12.1099 2.17785 12.1099 2.89036 11.6705 3.33004ZM3.29929 11.701L0.624152 11.9963C0.266022 12.0359 -0.0365366 11.7331 0.00328875 11.3749L0.300949 8.69792L6.81422 2.18513L9.81467 5.18558L3.29929 11.701Z"
                      fill="#0077FF"
                    />
                  </svg>
                </span>
              </>
            ) : (
              <div className="jur-bio-add">
                {loggedInUser() ? (
                  <Button
                    variant="dispute"
                    onClick={e => {
                      handleEdit(e);
                    }}
                  >
                    Add bio
                  </Button>
                ) : null}
              </div>
            )}
          </p>
        )}
      </div>
    </Box>
  );
};

const updateBioAction = (address, bio) => ({
  type: ADVOCATE_UPDATE_BIO,
  payload: { address, bio }
});

const mapDispatchToProps = { updateBioAction };

export default global.connection(AdvocateBio, null, mapDispatchToProps);
