import React, { useState } from "react";
import "./Counter.css";

import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
  reset,
  incremetAsync,
} from "../redux/counter/counterSlice";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  // const count = useSelector((state) => state.counter.value);
  const [incrementValue, setIncrementValue] = useState(2);
  return (
    <div className="counter">
      <h1>Essential Redux traning with Reduxjs/toolkits</h1>
      <div className="counter__section">
        <button
          className="counter__button"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className="value">{count}</span>
        <button
          className="counter__button"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button className="counter__button" onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>
      <div className="counter__section">
        <input
          type="text"
          className="textBox"
          value={incrementValue}
          onChange={(e) => setIncrementValue(e.target.value)}
        />
        <button
          className="counter__button"
          onClick={() => dispatch(incrementByAmount(Number(incrementValue)))}
        >
          Increment by {incrementValue}
        </button>
        <button
          className="counter__button"
          onClick={() => dispatch(incremetAsync(Number(incrementValue)))}
        >
          Increment Async by {incrementValue}
        </button>
      </div>
    </div>
  );
}

export default Counter;
