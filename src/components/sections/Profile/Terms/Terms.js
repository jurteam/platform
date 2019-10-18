import React from "react"; // eslint-disable-line no-unused-vars

// Components
import UserTerms from "../../../common/UserTerms";

// Data
import termsHtmlDev from "../../../../assets/i18n/en/termOfService.development"; // TODO: i18n
import termsHtmlStage from "../../../../assets/i18n/en/termOfService.stage"; // TODO: i18n
import termsHtmlProd from "../../../../assets/i18n/en/termOfService.production"; // TODO: i18n

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
  console.log("Terms", termsHtml,process.env.NODE_ENV);

  //process.env.NODE_ENV

  return <UserTerms termsHtml={termsHtml} />;
}
