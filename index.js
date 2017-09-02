import React from 'react';
import Model from './src/model';
import View from './src/view';
import ViewModel from './src/view-model';

const model = new Model();
const viewModel = new ViewModel(model);
const view = new View(viewModel, ({ counter, onClick }) => (
  <div onClick={onClick}>{counter}</div>
));
