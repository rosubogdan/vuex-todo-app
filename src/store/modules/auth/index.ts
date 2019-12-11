import State from '@/models/auth/user.state';
import User from '@/models/auth/user';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const user: User = {} as User;

const state: State = {
  user,
  isLoggedIn: false,
  isLoading: false,
  hasError: false,
  errorMessage: '',
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
