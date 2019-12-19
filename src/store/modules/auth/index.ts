import State from '@/models/auth/user.state';

import { initialState } from './state';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: State = initialState();

export const AUTH = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
