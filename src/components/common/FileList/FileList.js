import React from "react";


import "./FileList.scss";

export const FileList = ( props ) => (
  <ul className="jur-file-list">{props.children}</ul>
);
