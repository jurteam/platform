import React, { Component } from "react";


import "./Countdown.scss";

export class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expiring: false,
      expired: false,
      milliseconds: 0,
      playing: false,
      duration: this.calculateDuration(),
      completePercentage: 0
    };
  }

  componentDidMount = () => {
    switch (this.props.statusId) {
      case -1: // rejected
        break;
      case 0: // draft
      case 1: // waiting for counterparty
      case 2: // waiting for payment
        const date = this.getTimeLeft(this.state.duration);
        this.setState({
          ...date
        });
        break;
      case 5: // onGoing
        this.start(this.props.startDate, this.state.duration);
        break;
      case 8: // expired rosso
        this.setState({ expired: true });
        break;
      case 9: // contract closed
      case 21: // open friendly resolution
      case 29: // closed friendly resolution
      case 31: // Open dispute
        break;
      case 35: // onGoing dispute 24h
        this.start(this.props.startDate, this.state.duration);
        break;
      case 36: // extended Dispute 30min
        this.start(this.props.startDate, this.state.duration);
        break;
      case 38: // expired dispute
        this.setState({ expired: true });
        break;
      case 39: // dispute closed
        break;
      default:
    }
  };

  componentWillUnmount = () => {
    this.stop();
  };

  calculateDuration() {
    if (this.props.statusId === 31) { // if shown // 2 days
      return 2 * 24 * 60 * 60 * 1000; // TODO: change with proper value from chain DISPUTE_DISPERSAL_DURATION
    }

    if (this.props.statusId === 35) { // 7 days
      return 7 * 24 * 60 * 60 * 1000; // TODO: change with proper value from chain DISPUTE_VOTE_DURATION
    }

    if (this.props.statusId === 36) { // 24 hours
      return 24 * 60 * 60 * 1000; // TODO: change with proper value from chain DISPUTE_EXTENSION
    }

    const hoursToMillisecodsn = this.props.days * 24 * 60 * 60 * 1000;
    const hoursToMilliseconds = this.props.hours * 60 * 60 * 1000;
    const minutesToMilliseconds = this.props.minutes * 60 * 1000;
    return hoursToMillisecodsn + hoursToMilliseconds + minutesToMilliseconds;
  }

  getExpiringStatus(milliseconds) {
    if (
      (this.props.statusId === 5 &&
        milliseconds < this.props.expireAlertFrom) ||
      (this.props.statusId === 35 && milliseconds <= this.props.expireAlertFrom) ||
      this.props.statusId === 36
    ) {
      if (typeof this.props.onExpiring === "function") {
        this.props.onExpiring();
      }
      return true;
    }
  }

  calculatePercentage(milliseconds) {
    return 100 - (milliseconds * 100) / this.state.duration;
  }

  start = (startDate, duration) => {
    this.interval = setInterval(() => {
      const date = this.calculateCountDown(startDate, duration);
      if (date) {
        const percentage = this.calculatePercentage(date.milliseconds);
        this.setState({
          ...date,
          completePercentage: percentage,
          expiring: this.getExpiringStatus(date.milliseconds),
          playing: true
        });
        if (typeof this.props.onProgress === "function")
          this.props.onProgress(percentage);
      } else {
        this.setState((state) => {
          if (state.playing) {
            this.props.onExpire && this.props.onExpire();
            return { playing: false };
          }
        });
        this.stop();
      }
    }, 1000);
  };

  stop = () => {
    clearInterval(this.interval);
  };

  getDiff = (startDate, duration) => {
    return Date.parse(new Date(startDate)) + duration - Date.parse(new Date());
  };

  calculateCountDown = (startDate, duration) => {
    const diff = this.getDiff(startDate, duration);
    if (diff < 0) return false;
    return this.getTimeLeft(diff);
  };

  getTimeLeft = ( value ) => ({
    seconds: Math.floor((value / 1000) % 60),
    minutes: Math.floor((value / 1000 / 60) % 60),
    hours: Math.floor((value / (1000 * 60 * 60)) % 24),
    days: Math.floor(value / (1000 * 60 * 60 * 24)),
    milliseconds: value
  });

  addLeadingZeros = ( value ) => {
    let str = String(value);
    while (str.length < 2) {
      str = "0" + str;
    }
    return str;
  };

  render() {
    const { days, hours, minutes, seconds } = this.state;
    const {
      showSeconds,
      daysLabel,
      hoursLabel,
      minutesLabel,
      secondsLabel
    } = this.props;

    const classes = ["jur-countdown"];
    if (this.state.playing) {classes.push("jur-countdown--playing");}
    if (this.state.expiring) {classes.push("jur-countdown--expiring");}
    if (this.state.expired) {classes.push("jur-countdown--expired");}

    return (
      <div className={classes.join(" ")}>
        <div className="jur-countdown__item jur-countdown__days">
          <span className="value">{this.addLeadingZeros(days)}</span>
          <span className="label">{daysLabel}</span>
        </div>
        <div className="jur-countdown__item jur-countdown__hours">
          <span className="value">{this.addLeadingZeros(hours)}</span>
          <span className="label">{hoursLabel}</span>
        </div>
        <div className="jur-countdown__item jur-countdown__minutes">
          <span className="value">{this.addLeadingZeros(minutes)}</span>
          <span className="label">{minutesLabel}</span>
        </div>
        {showSeconds ? (
          <div className="jur-countdown__item jur-countdown__seconds">
            <span className="value">{this.addLeadingZeros(seconds)}</span>
            <span className="label">{secondsLabel}</span>
          </div>
        ) : null}
      </div>
    );
  }
}

Countdown.defaultProps = {
  daysLabel: "Days",
  hoursLabel: "Hours",
  minutesLabel: "Minutes",
  secondsLabel: "Seconds"
};
