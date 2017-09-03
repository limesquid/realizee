import { ViewModel } from 'realizee';
import { toggleDone } from './api';

export default ViewModel((model) => ({
  state: {
    todos: model.todos
  },
  lifecycle: {
    componentWillMount() {
      console.log('componentWillMount');
      model.loadData();
    },
    componentDidMount() {
      console.log('componentDidMount');
    }
  },
  handlers: {
    onTodoClick: (id) => {
      console.log('onTodoClick', id);
      toggleDone(id);
    }
  }
}));
