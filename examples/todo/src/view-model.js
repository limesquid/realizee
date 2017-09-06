import { ViewModel } from 'realizee';

export default ViewModel((todos) => ({
  state: {
    todos
  },
  computed: {
    completedCount: function() {
      return todos.entries.reduce((count, { done }) => {
        return done ? count + 1 : count;
      }, 0);
    },
    uncompletedCount: function() {
      return todos.entries.length - this.completedCount;
    }
  },
  lifecycle: {
    componentWillMount: () => todos.load()
  },
  handlers: {
    onTodoClick: (id) => todos.toggleDone(id)
  }
}));
