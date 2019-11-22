import State from '@/models/todo/todo.state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: State = {
  todos: [],
  selectedFilter: 5,
  filterValues: [5, 10, 20, 50],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
