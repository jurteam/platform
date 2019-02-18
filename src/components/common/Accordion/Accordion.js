import React, { Component } from 'react'

import './Accordion.scss';

export class Accordion extends Component {
  state = {
    activeAccordionIndex: null
  }

  onAccordionItemClick = (activeAccordionIndex) => {
    this.setState({ activeAccordionIndex });
  }

  render() {
    const {
      children,
      className,
      accordionTitle
    } = this.props;
    const childrenArray = React.Children.toArray(children);
    const accordionItems = childrenArray.map((accordionItem, index) => {
      const state = {
        active: this.state.activeAccordionIndex === index
      };
      return React.cloneElement(accordionItem, { onClick: this.onAccordionItemClick.bind(this, index), ...state, ...accordionItem.props });
    });

    return (
      <div className={`jur-accordion ${className || ''}`}>
        {accordionTitle && <h3>{ accordionTitle }</h3>}
        <ul className="jur-accordion__list">
          {accordionItems}
        </ul>
      </div>
    );
  }
}