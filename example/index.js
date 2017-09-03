import CounterModel from './model';
import CounterView from './view';
import CounterViewModel from './view-model';

const counterModel = CounterModel();
export default CounterViewModel(CounterView)(counterModel);
