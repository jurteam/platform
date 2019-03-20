import React from "react";
import PropTypes from "prop-types";
import { EyeIcon } from "../Icons/EyeIcon";
import { BinIcon } from "../Icons/BinIcon";
import "./File.scss";

export const File = ({ name, onView, onDelete, large }) => (
  <li className={`jur-file ${large ? "jur-file--large" : ""}`}>
    <div className="jur-file__name">{name}</div>
    <div className="jur-file__actions">
      {onDelete && (
        <span className="jur-file__actions__delete" onClick={onDelete}>
          <BinIcon />
        </span>
      )}
      <span className="jur-file__actions__view" onClick={onView}>
        <EyeIcon />
      </span>
    </div>
  </li>
);
