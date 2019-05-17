import React from "react";

import UserAction from "../UserAction";
import UserActionHeader from "../UserActionHeader";
import UserActionBody from "../UserActionBody";
import UserActionFooter from "../UserActionFooter";
import Button from "../Button";

import "./UserPrivacy.scss";

export const UserPrivacy = ( props ) => {
  const { data, className, disclaimerAccepted } = props;
  return (
    <div
      className={`jur-user-privacy ${className || ""} ${
        disclaimerAccepted ? "" : "jur-user-privacy--disclaimer-not-accepted"
      }`}
    >
      {data.map((item, i) => (
        <UserAction key={i.toString()}>
          <UserActionHeader>{item.title}</UserActionHeader>
          <UserActionBody>{item.description}</UserActionBody>
          <UserActionFooter>
            <Button
              size="big"
              variant={item.buttonVariant || "outlined"}
              onClick={() => item.handler()}
            >
              {item.buttonLabel}
            </Button>
          </UserActionFooter>
        </UserAction>
      ))}
    </div>
  );
};
