import React from "react";
import { EyeIcon } from "../Icons/EyeIcon";
import { BinIcon } from "../Icons/BinIcon";
import "./File.scss";

export const File = props => {
  const { name, onView, onDelete, large, file, disabled } = props;
  return (
    <li className={`jur-file ${large ? "jur-file--large" : ""}`}>
      <div className="jur-file__name">{name}</div>
      <div
        className={`jur-file__actions ${disabled ? "jur-file__disabled" : ""}`}
      >
        {onDelete && (
          <span
            className="jur-file__actions__delete"
            onClick={() => onDelete(file)}
          >
            <BinIcon />
          </span>
        )}
        <span className="jur-file__actions__view" onClick={() => onView(file)}>
          <EyeIcon />
        </span>
      </div>
    </li>
  );
};
