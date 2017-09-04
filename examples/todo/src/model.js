import { Model } from 'realizee';
import { getAll, toggleDone } from './api';

export default Model((entries = []) => ({
  entries,
  async load() {
    this.entries = await getAll();
  },
  async toggleDone(id) {
    this.entries = await toggleDone(id);
  }
}));
