import React, { useContext } from "react"; // eslint-disable-next-line no-unused-vars
import { AppContext } from "../../../bootstrap/AppProvider"; // App context

import Button from "../../../components/common/Button";

const Unlock = () => {
  const context = useContext(AppContext);

  let shouldUnlock = false;
  if (typeof window.web3 === "object") {
    // TODO: check based on _metamask itself
    //   const { currentProvider: { _metamask } } = window.web3
    //   console.log('UnderAuth - _metamask.isEnabled()', _metamask.isEnabled());
    //   console.log('UnderAuth - _metamask.isApproved()', _metamask.isApproved());
    //   console.log('UnderAuth - _metamask.isUnlocked()', _metamask.isUnlocked());
    shouldUnlock = true;
  }

  const unlock = () => {
    if (shouldUnlock) {
      const { auth } = context;
      auth();
    }
  };

  return (
    <div className="jur--metamask--required">
      <h2>MetaMask is Required</h2>
      <hr />
      <p>
        MetaMask is an extension for accessing Ethereum enabled distributed
        applications, or "Dapps" in your normal browser!
        <br />
        The extension injects the Ethereum web3 API into every website's
        javascript context, so that dapps can read from the blockchain.
      </p>
      {shouldUnlock && (
        <Button
          onClick={() => {
            unlock();
          }}
          style={{ marginLeft: "10px", width: "230px" }}
          size="big"
          color="info"
          variant="contained"
        >
          Unlock MetaMask
        </Button>
      )}
      <Button
        onClick={() => {
          window.open("https://metamask.io");
        }}
        style={{ marginLeft: "10px", width: "230px" }}
        size="big"
        color="info"
      >
        Get Chrome Extension
      </Button>
    </div>
  );
};

export default Unlock;
