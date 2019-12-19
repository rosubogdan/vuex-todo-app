import State from '@/models/todo/todo.state';

import { initialState } from './state';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: State = initialState();

export const TODOS = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
