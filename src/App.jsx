import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faPlay,
  faPause,
  faSync,
  faVolumeMute,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';

const audio = document.getElementById('beep');
class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: 'Session',
    isPlaying: false,
    audioMuted: false,
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
        } else if (clockCount === 3) {
          this.setState({ clockCount: clockCount - 1 });
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
      audioMuted: false,
    });

    clearInterval(this.loop);

    audio.pause();
    audio.muted = false;
    audio.currentTime = 0;
  };

  handleAudioMute = () => {
    audio.muted = !audio.muted;
    this.setState({
      audioMuted: audio.muted,
    });
  };

  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  handleBreakDecrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;
    if (breakCount > 1) {
      if (!isPlaying && currentTimer === 'Break') {
        this.setState({
          breakCount: breakCount - 1,
          clockCount: (breakCount - 1) * 60,
        });
      } else if (isPlaying) {
        // do nothing
        return;
      } else {
        this.setState({
          breakCount: breakCount - 1,
        });
      }
    }
  };

  handleBreakIncrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;
    if (breakCount < 60) {
      if (!isPlaying && currentTimer === 'Break') {
        this.setState({
          breakCount: breakCount + 1,
          clockCount: (breakCount + 1) * 60,
        });
      } else if (isPlaying) {
        // do nothing
        return;
      } else {
        this.setState({
          breakCount: breakCount + 1,
        });
      }
    }
  };

  handleSessionDecrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;
    if (sessionCount > 1) {
      if (!isPlaying && currentTimer === 'Session') {
        this.setState({
          sessionCount: sessionCount - 1,
          clockCount: (sessionCount - 1) * 60,
        });
      } else if (isPlaying) {
        // do nothing
        return;
      } else {
        this.setState({
          sessionCount: sessionCount - 1,
        });
      }
    }
  };

  handleSessionIncrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;
    if (sessionCount < 60) {
      if (!isPlaying && currentTimer === 'Session') {
        this.setState({
          sessionCount: sessionCount + 1,
          clockCount: (sessionCount + 1) * 60,
        });
      } else if (isPlaying) {
        // do nothing
        return;
      } else {
        this.setState({
          sessionCount: sessionCount + 1,
        });
      }
    }
  };

  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlaying,
      audioMuted,
    } = this.state;

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
          <div className="clock-internal">
            <h1
              id="timer-label"
              className={isPlaying ? 'squiggly' : 'undefined'}
            >
              {currentTimer}
            </h1>
            <span
              id="time-left"
              className={isPlaying ? 'squiggly number' : 'number'}
            >
              {this.convertToTime(clockCount)}
            </span>
          </div>
          <div className="flex">
            <button id="start_stop" onClick={this.handlePlayPause}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button id="reset" onClick={this.handleReset}>
              <FontAwesomeIcon icon={faSync} />
            </button>
            <button id="mute_audio" onClick={this.handleAudioMute}>
              <FontAwesomeIcon icon={audioMuted ? faVolumeMute : faVolumeUp} />
            </button>
          </div>
        </div>
        <div id="squigglyText">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="squiggly-0">
                <feTurbulence
                  id="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                  seed="0"
                />
                <feDisplacementMap
                  id="displacement"
                  in="SourceGraphic"
                  in2="noise"
                  scale="6"
                />
              </filter>
              <filter id="squiggly-1">
                <feTurbulence
                  id="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                  seed="1"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
              </filter>

              <filter id="squiggly-2">
                <feTurbulence
                  id="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                  seed="2"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
              </filter>
              <filter id="squiggly-3">
                <feTurbulence
                  id="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                  seed="3"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
              </filter>

              <filter id="squiggly-4">
                <feTurbulence
                  id="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                  seed="4"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
              </filter>
            </defs>
          </svg>
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
        <span id={`${id}-length`} className="number">
          {props.count}
        </span>
        <button id={`${id}-increment`} onClick={props.handleIncrease}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default App;
