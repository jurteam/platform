import React from "react";
import PropTypes from "prop-types";
import { EyeIcon } from "../Icons/EyeIcon";
import { BinIcon } from "../Icons/BinIcon";
import "./File.scss";

export const File = ({ name, onView, onDelete, large, file, disabled }) => (
  <li className={`jur-file ${large ? "jur-file--large" : ""}`}>
    <div className="jur-file__name">{name}</div>
    <div className={`jur-file__actions ${disabled ? "jur-file__disabled" : ""}`}>
      {onDelete && (
        <span className="jur-file__actions__delete" onClick={() => onDelete(file)}>
          <BinIcon />
        </span>
      )}
      <span className="jur-file__actions__view" onClick={() => onView(file)}>
        <EyeIcon />
      </span>
    </div>
  </li>
);
