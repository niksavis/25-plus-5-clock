import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faPlay,
  faPause,
  faSync,
} from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: 'Session',
    isPlaying: false,
    loop: undefined,
  };

  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({ isPlaying: false });
    } else {
      this.setState({ isPlaying: true });
      this.loop = setInterval(() => {
        const { clockCount, currentTimer, breakCount, sessionCount } =
          this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
            clockCount:
              currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60,
          });
        } else {
          this.setState({ clockCount: clockCount - 1 });
        }
      }, 1000);
    }
  };

  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false,
    });

    clearInterval(this.loop);
  };

  convertToTime = (count) =>
    count < 3600
      ? new Date(count * 1000).toISOString().substring(14, 19)
      : new Date(count * 1000).toISOString().substring(11, 19);

  handleBreakDecrease = () => {
    const { breakCount } = this.state;
    if (breakCount > 0) {
      this.setState({
        breakCount: breakCount - 1,
      });
    }
  };

  handleBreakIncrease = () => {
    const { breakCount } = this.state;
    if (breakCount < 1440) {
      this.setState({
        breakCount: breakCount + 1,
      });
    }
  };

  handleSessionDecrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount > 0) {
      this.setState({
        sessionCount: sessionCount - 1,
      });
    }
  };

  handleSessionIncrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount < 1440) {
      this.setState({
        sessionCount: sessionCount + 1,
      });
    }
  };

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer, isPlaying } =
      this.state;

    const breakProps = {
      title: 'Break Length',
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };

    const sessionProps = {
      title: 'Session Length',
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
    };

    return (
      <div>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-container">
          <h1>{currentTimer}</h1>
          <span>{this.convertToTime(clockCount)}</span>
          <div className="flex">
            <button onClick={this.handlePlayPause}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button onClick={this.handleReset}>
              <FontAwesomeIcon icon={faSync} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const SetTimer = (props) => (
  <div className="timer-container">
    <h2>{props.title}</h2>
    <div className="flex actions-wrapper">
      <button onClick={props.handleDecrease}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span>{props.count}</span>
      <button onClick={props.handleIncrease}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </div>
);

export default App;
