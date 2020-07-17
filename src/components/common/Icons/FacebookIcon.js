import React from "react";

export const FacebookIcon = ({ className = "", fill = "white" }) => (
  <svg
    className={className}
    viewBox="0 0 32 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.903 33.75L31.5624 22.8914H21.1871V15.8449C21.1871 12.8742 22.6364 9.97852 27.2832 9.97852H32V0.733594C32 0.733594 27.7196 0 23.6272 0C15.0828 0 9.49778 5.20078 9.49778 14.6156V22.8914H0V33.75H9.49778V60H21.1871V33.75H29.903Z"
      fill={fill}
    />
  </svg>
);
