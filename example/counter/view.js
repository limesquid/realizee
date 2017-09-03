import React from 'react';

const CounterView = ({ counter, even, onClick }) => (
  <div>
    <div onClick={onClick}>{counter}</div>
    <div>{even ? 'Even' : 'Odd'}</div>
  </div>
);

export default CounterView;
