import React from "react";

export const CopyIcon = ({ className = "", fill = "#DCDCDC" }) => (
  <svg
    className={className}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.8571 18.125C12.8571 19.1605 11.9937 20 10.9286 20H1.92857C0.863447 20 0 19.1605 0 18.125V5.625C0 4.58946 0.863447 3.75 1.92857 3.75H5.14286V1.875C5.14286 0.839462 6.0063 0 7.07143 0H13.9869C14.4278 0 15.0388 0.246048 15.3506 0.549164L17.4351 2.57584C17.7469 2.87895 18 3.47294 18 3.90163V14.375C18 15.4105 17.1366 16.25 16.0714 16.25H12.8571V18.125ZM7.3125 14.375H15.8304C15.9634 14.375 16.0714 14.27 16.0714 14.1406V6.25H12.5357C12.0032 6.25 11.5714 5.83027 11.5714 5.3125V1.875H7.3125C7.17945 1.875 7.07143 1.98002 7.07143 2.10938V14.1406C7.07143 14.27 7.17945 14.375 7.3125 14.375ZM16.0714 4.375H13.5V1.875H13.887C13.9509 1.875 14.0122 1.89968 14.0575 1.94363L16.0008 3.83301C16.0268 3.85826 16.0495 3.89967 16.0618 3.94035L16.0714 3.99876V4.375ZM2.16964 18.125H10.6875C10.8206 18.125 10.9286 18.02 10.9286 17.8906V16.25H7.07143C6.0063 16.25 5.14286 15.4105 5.14286 14.375V5.625H2.16964C2.03659 5.625 1.92857 5.73002 1.92857 5.85938V17.8906C1.92857 18.02 2.03659 18.125 2.16964 18.125Z"
      fill={fill}
    />
  </svg>
);
