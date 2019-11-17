import State from '@/models/auth/user.state';
import User from '@/models/auth/user';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

let user: User = new User('', '');

const state: State = {
  user,
  isLoggedIn: false,
  loginStatus: null,
  registerStatus: null
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
