import React, { useState, useRef } from 'react';
// import './App.css';

function CountdownTimer() {
  // State for hours, minutes, and seconds
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    if (isActive) return;

    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(intervalRef.current);
          setIsActive(false);
          return prevTime;
        }

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        }

        if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        }

        if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        }

        return prevTime;
      });
    }, 1000);
  };

  // Function to pause the timer
  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsActive(false);
  };

  // Handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: Math.max(0, Math.min(Number(value), 59)), // Ensures valid range
    }));
  };

  return (
    <div className="container">
      <h1>Countdown Timer</h1>
      <div className="input-group">
        <input
          type="number"
          name="hours"
          value={time.hours}
          onChange={handleChange}
          placeholder="HH"
          disabled={isActive}
        />
        <span>:</span>
        <input
          type="number"
          name="minutes"
          value={time.minutes}
          onChange={handleChange}
          placeholder="MM"
          disabled={isActive}
        />
        <span>:</span>
        <input
          type="number"
          name="seconds"
          value={time.seconds}
          onChange={handleChange}
          placeholder="SS"
          disabled={isActive}
        />
      </div>
      <div className="buttons">
        <button onClick={startTimer} disabled={isActive}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isActive}>
          Pause
        </button>
        <button onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default CountdownTimer;
