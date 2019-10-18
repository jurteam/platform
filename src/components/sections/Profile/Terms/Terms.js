import React from "react"; // eslint-disable-line no-unused-vars

// Components
import UserTerms from "../../../common/UserTerms";
import { log } from "../../../../utils/helpers";
// Data
import termsHtml from "../../../../assets/i18n/en/termOfService"; // TODO: i18n

export function Terms() {

  let termsHtml = '';

  if (process.env.NODE_ENV === "stage") {
    termsHtml=termsHtmlStage
  }
  else if (process.env.NODE_ENV === "development") {
    termsHtml=termsHtmlDev
  }
  else if (process.env.NODE_ENV === "production") {
    termsHtml=termsHtmlProd
  }
  log("Terms", termsHtml,process.env.NODE_ENV);

  //process.env.NODE_ENV

  return <UserTerms termsHtml={termsHtml} />;
}
