import TodosModel from './model';
import TodosView from './view';
import TodosViewModel from './view-model';

const todosModel = TodosModel([
  { id: 0, text: 'xx', done: false }
]);
export default TodosViewModel(TodosView)(todosModel);
