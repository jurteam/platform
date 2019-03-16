import React from "react"; // eslint-disable-line no-unused-vars

// Components
import UserTerms from "../../../common/UserTerms";

// Data
import termsHtml from "../../../../assets/i18n/en/termOfService"; // TODO: i18n

export function Terms() {
  console.log("Terms", termsHtml);

  return <UserTerms termsHtml={termsHtml} />;
}
