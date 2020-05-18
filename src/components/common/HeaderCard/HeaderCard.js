import React, { Component } from "react";
import PropTypes from "prop-types";

import "./HeaderCard.scss";

import BlockTitle from "../BlockTitle";
import Col from "../Col";

const HeaderCard = ({ children, title, description }) => {
  let hero, body;
  React.Children.forEach(children, child =>
    hero === undefined ? (hero = child) : (body = child)
  );

  return (
    <Col className="jur-header-card">
      {hero}
      <BlockTitle title={title} description={description} />
      {body}
    </Col>
  );
};

HeaderCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default HeaderCard;
