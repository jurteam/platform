import React, { useState, useContext } from "react"; // eslint-disable-line no-unused-vars
import { drizzleConnect } from "drizzle-react";
import Blockies from "react-blockies";

import { AppContext } from "./../../../../bootstrap/AppProvider";

import "./ProfileSettings.scss"; // style

const ProfileSettings = props => {
  // Context
  const { labels } = useContext(AppContext);

  const { wallet } = props;

  // State hooks
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();

  // TODO: shoudl use redux form or similar

  return (
    <div className="jur--profile-settings">
      {wallet.address && <Blockies seed={wallet.address} />}
      <label>
        {labels.wallet} <span>*</span>
      </label>
      <input disabled value={wallet.address || ''} />
      <hr />

      <label>
        {labels.fullName} <span>({labels.optional})</span>
      </label>
      <input
        name="full_name"
        placeholder={labels.fullNamePlaceholder}
        value={fullName}
        onChange={e => setFullName(e.target.value)}
      />

      <label>
        {labels.email} <span>({labels.optional})</span>
      </label>
      <input
        name="full_name"
        placeholder={labels.emailPlaceholder}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  wallet: state.wallet
});

export default drizzleConnect(ProfileSettings, mapStateToProps);
