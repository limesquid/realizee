import { Model } from 'realizee';
import { getAll } from './api';

export default Model({
  todos: [],
  async loadData() {
    this.todos = await getAll();
  }
});
