import { ViewModel } from 'realizee';

export default ViewModel((todos) => ({
  state: {
    todos
  },
  lifecycle: {
    componentWillMount: () => todos.load()
  },
  handlers: {
    onTodoClick: (id) => todos.toggleDone(id)
  }
}));
