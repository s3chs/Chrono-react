import React, { useState, useEffect, useReducer } from "react";
import "./Chrono.css";
import PauseImg from "../Images/pause.svg";
import PlayImg from "../Images/play.svg";
import ResetImg from "../Images/reset.svg";

export default function Chrono() {
  const [sessionTime, setSessionTime] = useState(1500);
  const [sessionTimeFixed, setSessionTimeFixed] = useState(1500);

  const [breakTime, setBreakTime] = useState(300);
  const [breakTimeFixed, setBreakTimeFixed] = useState(300);

  const [workingChrono, setWorkingChrono] = useState(false);
  const [state, dispatch] = useReducer(reducer);

  function reducer(state, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "TICK":
        if (sessionTime >= 0) {
          setSessionTime(sessionTime - 1);
        } else if (breakTime >= 1) {
          setBreakTime(breakTime - 1);
        } else if (breakTime <= 0 && breakTime <= 0) {
          setSessionTime(sessionTimeFixed);
          setBreakTime(setBreakTimeFixed);
        }
    }
  }

  useEffect(() => {
    let id;

    if (workingChrono) {
      id = window.setInterval(() => dispatch({ type: "TICK" }), 1000);
    }

    return () => {
      window.clearInterval(id);
    };
  }, [workingChrono]);

  const playPause = () => {
    setWorkingChrono(!workingChrono);
  };

  return (
    <div className="container-chrono">
      <div className="container-config">
        <div className="box-btns session">
          <button className="minus">-</button>
          <span>{sessionTimeFixed / 60}</span>
          <button className="plus">+</button>
        </div>
        <div className="box-btns break">
          <button className="minus">-</button>
          <span>{breakTimeFixed / 60}</span>
          <button className="plus">+</button>
        </div>
      </div>
      <h1>
        <span>CHRONO</span>
      </h1>
      <div className="container-controllers">
        <button onClick={playPause}>
          <img src={workingChrono ? PauseImg : PlayImg} alt="play" />
        </button>
        <button>
          <img src={ResetImg} alt="reset" />
        </button>
      </div>
    </div>
  );
}
