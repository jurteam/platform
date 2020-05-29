import React, { useState, useEffect } from "react";
import "./Message.scss";
import Text from "../Text";

const Message = ({ children, type, timeOut }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    if (!timeOut) return;
    const id = setTimeout(() => setIsVisible(false), timeOut);
    return () => clearTimeout(id);
  }, [children, timeOut]);

  return (
    isVisible &&
    children && (
      <Text type="div" className={`jur-message jur-message__${type}`}>
        {children}
      </Text>
    )
  );
};

export default Message;
