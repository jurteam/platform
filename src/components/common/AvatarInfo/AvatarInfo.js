import React from "react";

import Avatar from "../Avatar";

import "./AvatarInfo.scss";

export const AvatarInfo = ( props ) => {
  const {
    userName,
    userWallet,
    shouldRenderName,
    type,
    variant,
    maxTextWidth,
    size,
    ...rest
  } = props;
  return (
    <div
      className={`jur-avatar-info ${
        variant ? `jur-avatar-info--${variant}` : ""
      }`}
      {...rest}
    >
      <Avatar seed={userWallet} size={size} variant={type} />
      <div
        className="jur-avatar-info__text"
        style={{ width: maxTextWidth || 150 }}
      >
        {shouldRenderName && userName ? userName : userWallet}
      </div>
    </div>
  );
};


AvatarInfo.defaultProps = {
  size: "xsmall"
};
