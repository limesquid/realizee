import { ViewModel } from 'realizee';

export default ViewModel((counterModel) => ({
  state: {
    counter: counterModel.counter
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
