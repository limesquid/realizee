import React from 'react';

const CounterView = ({
  counter,
  even,
  todos = [],
  valuesFromGenerator,
  valuesFromGeneratorFn,
  onClick
}) => (
  <div>
    <div onClick={onClick}>{counter}</div>

    <div>{even ? 'Even' : 'Odd'}</div>

    <div>
      Todos:
      {todos.map(value => (
        <span key={value} style={{ marginLeft: '10px' }}>
          {value}
        </span>
      ))}
    </div>

    <div>
      Values from generator:
      {valuesFromGenerator.map(value => (
        <span key={value} style={{ marginLeft: '10px' }}>
          {value}
        </span>
      ))}
    </div>

    <div>
      Values from generator function:
      {valuesFromGeneratorFn.map(value => (
        <span key={value} style={{ marginLeft: '10px' }}>
          {value}
        </span>
      ))}
    </div>
  </div>
);

export default CounterView;
