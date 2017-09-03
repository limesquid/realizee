import { ViewModel } from 'realizee';

export default ViewModel((counterModel) => ({
  state: {
    counter: counterModel.counter,
    valueFromPromise: new Promise((resolve) => {
      setTimeout(() => resolve('Value from promise'), 1000);
    }),
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
