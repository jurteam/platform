import React, { useContext } from "react";
import PropTypes from "prop-types";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./UserTerms.scss";

export const UserTerms = props => {
  const { termsHtml } = props;
  const { labels } = useContext(AppContext);
  return (
    <div className="jur-terms">
      <h3>{labels.termOfService}</h3>
      <div
        className="jur-terms__content"
        dangerouslySetInnerHTML={{ __html: termsHtml }}
      />
    </div>
  );
};
