import React, { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <h2 data-testid="counter">{counter}</h2>
      <div>
        <button onClick={() => setCounter((counter) => counter - 1)} disabled={disabled}>
          -
        </button>
        <button onClick={() => setCounter((counter) => counter + 1)} disabled={disabled}>
          +
        </button>
      </div>
      <button style={{ backgroundColor: 'blue' }} onClick={() => setDisabled((prev) => !prev)}>
        on/off
      </button>
    </div>
  );
};

export default Counter;
