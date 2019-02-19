import React, { useContext } from "react"; // eslint-disable-next-line no-unused-vars
import { AppContext } from "../../../bootstrap/AppProvider"; // App context

import UserAction from "../../../components/common/UserAction";
import UserActionHeader from "../../../components/common/UserActionHeader";
import UserActionBody from "../../../components/common/UserActionBody";
import UserActionFooter from "../../../components/common/UserActionFooter";
import Button from "../../../components/common/Button";

const Unlock = () => {
  const context = useContext(AppContext);

  const { labels } = context; // i18n

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
    <div className="jur--body">
      <UserAction>
        <UserActionHeader variant="error">
          {labels.metamaskRequired}
        </UserActionHeader>
        <UserActionBody>{labels.metamaskRequiredDesc}</UserActionBody>
        <UserActionFooter>
          {shouldUnlock && (
            <Button
              onClick={() => {
                unlock();
              }}
              size="big"
              variant="contained"
            >
              {labels.unlockMetamask}
            </Button>
          )}
          <Button
            onClick={() => {
              window.open("https://metamask.io");
            }}
            size="big"
          >
            {labels.getChromeExtension}
          </Button>
        </UserActionFooter>
      </UserAction>
    </div>
  );
};

export default Unlock;
