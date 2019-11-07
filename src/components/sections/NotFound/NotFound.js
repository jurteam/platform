import React from "react";

export const NotFound = (props) => {
      
      // redirect to home
      const { history } = props;
      history.push("/");
      return null
 };
