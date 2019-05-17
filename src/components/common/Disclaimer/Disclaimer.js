import React, { useContext } from "react";
import Button from "../Button";
import { AppContext } from "../../../bootstrap/AppProvider";
import { CheckCircleIcon } from "../Icons/CheckCircleIcon";

import "./Disclaimer.scss";

export const Disclaimer = ( props ) => {
  const { labels } = useContext(AppContext);

  const {
    // isOpen,
    title,
    description,
    // accepted,
    // declineLabel,
    acceptLabel,
    closeLabel,
    onAccept,
    // onDecline,
    user: { disclaimer },
    disclaimerView,
    disclaimerAccept
    // disclaimerDecline
  } = props;

  let shouldClose = null;

  const handleAccept = () => {
    if (shouldClose) {
      clearTimeout(shouldClose);
    } // clear close timeout if needed

    disclaimerAccept();
    disclaimerView(!disclaimer.viewed);
    if (typeof onAccept === "function") { onAccept(); };
  };

  // NOTE: Decline action removed due it's availability only on Profile Settings > Privacy page
  // const handleDecline = () => {
  //   disclaimerDecline()
  //   if (typeof onDecline === 'function') onDecline();
  // };

  const handleVisibility = () => {
    if (shouldClose) {
      clearTimeout(shouldClose);
    } // clear close timeout if needed

    const opened = !disclaimer.viewed;
    disclaimerView(opened);

    // handle disclaimer auto close
    if (!opened)
      shouldClose = setTimeout(
        () => disclaimerView(!opened),
        process.env.REACT_APP_DISCLAIMER_CLOSE_DELAY
      );
  };

  return (
    <div
      className={`jur-disclaimer ${
        !disclaimer.viewed ? "jur-disclaimer--is-open" : ""
      }`}
    >
      <h3 onClick={handleVisibility}>
        <span>{title || labels.disclaimer}</span>{" "}
        {disclaimer.optin ? <CheckCircleIcon /> : null}
      </h3>
      {!disclaimer.viewed ? (
        <div className="jur-disclaimer__content">
          <div className="jur-disclaimer__description">
            {description || labels.disclaimerText}
          </div>
          <div className="jur-disclaimer__cta">
            {!disclaimer.optin && (
              <Button size="small" variant="contained" onClick={handleAccept}>
                {acceptLabel || labels.accept}
              </Button>
            )}
            <Button size="small" onClick={handleVisibility}>
              {closeLabel || labels.close}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
