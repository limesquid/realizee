import { ViewModel } from 'realizee';
import { getAll } from '../../todo/src/api';

export default ViewModel((counterModel) => ({
  state: {
    counter: counterModel.counter,
    todos: getAll()
      .then(todos => todos.map(({ text }) => text)),
    valuesFromGeneratorFn: function* () {
      for(let i = 1; i <= 10; i++) {
        yield i;
      }
    },
    valuesFromGenerator: (function* () {
      for(let i = 1; i <= 10; i++) {
        yield i;
      }
    })()
  },
  computed: {
    even() {
      return this.counter % 2 === 0;
    }
  },
  lifecycle: {
    componentDidMount() {
      counterModel.loadData();
    }
  },
  handlers: {
    onClick: () => counterModel.increase()
  }
}));
