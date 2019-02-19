import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Countdown.scss';

export class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  start = () => {
    this.interval = setInterval(() => {
      if (this.props.status > 2) {
        const date = this.calculateCountdown(this.props.expireDate);
        date ? this.setState(date) : this.stop();
      }
    }, 1000);
  }

  componentDidMount = () => {
    if (this.props.status > 2) {
      this.start();
    } else {
      this.setInitialCountdown();
    }
  }

  setInitialCountdown = () => {
    this.setState(this.getTimeLeft(this.props.duration));
  }

  componentWillUnmount = () => {
    this.stop()
  }

  stop = () => {
    clearInterval(this.interval)
  }

  getTimeLeft = (diff) => {
    return {
      seconds: Math.floor((diff/ 1000) % 60),
      minutes: Math.floor((diff/ 1000 / 60) % 60),
      hours: Math.floor((diff/ (1000 * 60 * 60)) % 24),
      days: Math.floor(diff/ (1000 * 60 * 60 * 24))
    }
  }

  calculateCountdown = (expireDate) => {
    let diff = (Date.parse(new Date(expireDate)) - Date.parse(new Date()));
    if (diff <= 0) return false;
    return this.getTimeLeft(diff);
  }

  addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    const { showSeconds, daysLabel, hoursLabel, minutesLabel, secondsLabel } = this.props;
    return (
      <div className="jur-countdown">
        <div className="jur-countdown__item jur-countdown__days">
          <span className="value">{ this.addLeadingZeros(days) }</span>  
          <span className="label">{ daysLabel }</span>  
        </div>
        <div className="jur-countdown__item jur-countdown__hours">
          <span className="value">{ this.addLeadingZeros(hours) }</span>  
          <span className="label">{ hoursLabel }</span>  
        </div>
        <div className="jur-countdown__item jur-countdown__minutes">
          <span className="value">{ this.addLeadingZeros(minutes) }</span>  
          <span className="label">{ minutesLabel }</span>  
        </div>
        {showSeconds ?
          <div className="jur-countdown__item jur-countdown__seconds">
            <span className="value">{ this.addLeadingZeros(seconds) }</span>  
            <span className="label">{ secondsLabel }</span>  
          </div>
          : null
        }
      </div>
    );
  }
}
