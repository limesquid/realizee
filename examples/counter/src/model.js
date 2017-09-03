import { Model } from 'realizee';

export default Model({
  counter: 1,
  increase() {
    this.counter++;
  }
});
