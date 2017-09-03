import { Model } from 'realizee';

export default Model({
  counter: 0,
  increase() {
    this.counter++;
  }
});
