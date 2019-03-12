import React, { Component } from 'react'

import './Accordion.scss';

export class Accordion extends Component {
  state = {
    currentIndex: null
  }

  onAccordionItemClick = (activeIndex) => {
    if (this.state.currentIndex === activeIndex) {
      activeIndex = null;
    }
    this.setState({ currentIndex: activeIndex });
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
        active: this.state.currentIndex === index
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