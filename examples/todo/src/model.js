import { Model } from 'realizee';
import { getAll, toggleDone } from './api';

export default Model((todos = []) => ({
  todos,
  async load() {
    this.todos = await getAll();
  },
  async toggleDone(id) {
    this.todos = await toggleDone(id);
  }
}));
