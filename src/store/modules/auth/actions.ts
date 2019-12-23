import User from '@/models/auth/user';

import { STORE_AUTH_MODULE } from '@/constants';
import { GENERIC } from '@/store/mutations';

import { initialState } from '@/store/modules/auth/state';

import { REGISTER, LOGIN, LOGOUT } from '@/services/firebase.service';

import {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
} from './mutations';

export const REGISTER_ACTION = `${STORE_AUTH_MODULE}/REGISTER_ACTION`;
export const LOGIN_ACTION = `${STORE_AUTH_MODULE}/LOGIN_ACTION`;
export const LOGOUT_ACTION = `${STORE_AUTH_MODULE}/LOGOUT_ACTION`;
export const RESET = `${STORE_AUTH_MODULE}/RESET`;

export const actions = {

  REGISTER_ACTION: async ({ commit }: any, user: User) => {
    try {
      commit(GENERIC.IS_LOADING_MUTATION, { isLoading: true });
      await REGISTER(user);
      commit(REGISTER_MUTATION, { hasError: false });
      commit(GENERIC.IS_LOADING_MUTATION, { isLoading: false });
    } catch (error) {
      console.error(error);
      commit(REGISTER_MUTATION, { hasError: true, errorMessage: error.message });
      commit(GENERIC.IS_LOADING_MUTATION, { isLoading: false });
    }
  },

  LOGIN_ACTION: async ({ commit }: any, user: User) => {
    try {
      commit(GENERIC.IS_LOADING_MUTATION, { isLoading: true });
      const response: any = await LOGIN(user);
      const userInfo: Partial<User> = response.user;
      commit(LOGIN_MUTATION, { user: userInfo, hasError: false });
      commit(GENERIC.IS_LOADING_MUTATION, { isLoading: false });

    } catch (error) {
      commit(LOGIN_MUTATION, { user: null, hasError: true, errorMessage: error.message });
      commit(GENERIC.IS_LOADING_MUTATION, { isLoading: false });
    }
  },

  LOGOUT_ACTION: async ({ commit }: any, payload: any) => {
    commit(GENERIC.IS_LOADING_MUTATION, { isLoading: true });
    await LOGOUT();
    commit(LOGOUT_MUTATION, { user: null, isLoggedIn: false });
    commit(GENERIC.IS_LOADING_MUTATION, { isLoading: false });
  },

  // RESET: async ({ commit }: any) => commit(RESET_MUTATION),
};
