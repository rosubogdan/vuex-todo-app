import State from '@/models/todo/todo.state';
import Todo from '@/models/todo/todo';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: State = {
  todos: [],
  todo: {} as Todo,
  perPage: 5,
  perPageOptions: [5, 10, 20, 50],
  isLoading: false,
  hasError: false,
  errorMessage: '',
  successMessage: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
