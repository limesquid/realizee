import { ViewModel } from 'realizee';
import { getAll, toggleDone } from './api';

export default ViewModel((model) => ({
  state: {
    todos: getAll() // TODO: change to "model.todos"
  },
  lifecycle: {
    componentWillMount() {
      console.log('componentWillMount');
      model.loadData();
    }
  },
  handlers: {
    onTodoClick: (id) => toggleDone(id)
  }
}));
