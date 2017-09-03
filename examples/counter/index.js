import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import Counter from './src';

const rootElement = document.getElementById('app');
ReactDOM.render(<Counter />, rootElement);
