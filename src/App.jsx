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

const audio = document.getElementById('beep');
class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 3,
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
          audio.play();
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

    audio.pause();
    audio.currentTime = 0;
  };

  convertToTime = (count) =>
    count < 3600
      ? new Date(count * 1000).toISOString().substring(14, 19)
      : new Date(count * 1000).toISOString().substring(11, 19);

  handleBreakDecrease = () => {
    const { breakCount } = this.state;
    if (breakCount > 1) {
      this.setState({
        breakCount: breakCount - 1,
      });
    }
  };

  handleBreakIncrease = () => {
    const { breakCount } = this.state;
    if (breakCount < 60) {
      this.setState({
        breakCount: breakCount + 1,
      });
    }
  };

  handleSessionDecrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount > 1) {
      this.setState({
        sessionCount: sessionCount - 1,
      });
    }
  };

  handleSessionIncrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount < 60) {
      this.setState({
        sessionCount: sessionCount + 1,
      });
    }
  };

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer, isPlaying } =
      this.state;

    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };

    const sessionProps = {
      title: 'Session',
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
          <h1 id="timer-label">{currentTimer}</h1>
          <span id="time-left">{this.convertToTime(clockCount)}</span>

          <div className="flex">
            <button id="start_stop" onClick={this.handlePlayPause}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button id="reset" onClick={this.handleReset}>
              <FontAwesomeIcon icon={faSync} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const SetTimer = (props) => {
  const id = props.title.toLowerCase();
  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>{props.title} Length</h2>
      <div className="flex actions-wrapper">
        <button id={`${id}-decrement`} onClick={props.handleDecrease}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span id={`${id}-length`}>{props.count}</span>
        <button id={`${id}-increment`} onClick={props.handleIncrease}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default App;
