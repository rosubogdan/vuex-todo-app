import State from '@/models/todo/todo.state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: State = {
  todos: [],
  selectedFilter: 5,
  filterValues: [200, 100, 50, 20, 10, 5],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
