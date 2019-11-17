import User from '@/models/auth/user';

import { REGISTER, LOGIN, LOGOUT } from '@/services/firebase.service';
import {STORE_AUTH_MODULE} from '@/constants';
import {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION
} from './mutations';

const REGISTER_SUCCESS_MESSAGE = 'Registered !';

export const REGISTER_ACTION = `${STORE_AUTH_MODULE}/REGISTER_ACTION`
export const LOGIN_ACTION = `${STORE_AUTH_MODULE}/LOGIN_ACTION`;
export const LOGOUT_ACTION = `${STORE_AUTH_MODULE}/LOGOUT_ACTION`;

export const actions = {
  REGISTER_ACTION: async ({ commit }: any, user: User) => {
    try {
      await REGISTER(user);
      commit(REGISTER_MUTATION, { status: true, message: REGISTER_SUCCESS_MESSAGE });
    } catch (error) {
      console.error(error);
      commit(REGISTER_MUTATION, { status: false, message: error.message });
    }
  },

  LOGIN_ACTION: async ({ commit }: any, user: User) => {
    try {
      const response = await LOGIN(user);
      const userInfo: User = new User(response.user.uid, response.user.email, response.user.displayName);
      commit(LOGIN_MUTATION, { user: userInfo, status: true });
    } catch (error) {
      commit(LOGIN_MUTATION, { user: null, status: false, message: error.message });
    }
  },

  LOGOUT_ACTION: async ({ commit }: any, user: User) => {
    await LOGOUT();
    commit(LOGOUT_MUTATION, null);

  },
};