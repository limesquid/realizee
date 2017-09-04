import { ViewModel } from 'realizee';

export default ViewModel((model) => ({
  state: {
    todos: model.todos
  },
  lifecycle: {
    componentWillMount: () => model.load()
  },
  handlers: {
    onTodoClick: (id) => model.toggleDone(id)
  }
}));
