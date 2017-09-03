import TodosModel from './model';
import TodosView from './view';
import TodosViewModel from './view-model';

const todosModel = TodosModel();
export default TodosViewModel(TodosView)(todosModel);
