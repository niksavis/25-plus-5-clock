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
  };

  render() {
    const { breakCount, sessionCount } = this.state;

    const breakProps = {
      title: 'Break Length',
      count: 5,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };

    const sessionProps = {
      title: 'Session Length',
      count: 25,
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
          <h1>Session</h1>
          <span>25:00</span>
          <div className="flex">
            <button onClick={this.handlePlayPause}>
              <FontAwesomeIcon icon={faPlay} />
              <FontAwesomeIcon icon={faPause} />
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
