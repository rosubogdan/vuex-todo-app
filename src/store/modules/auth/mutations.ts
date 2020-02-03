import State from '@/models/auth/user.state';

import { set } from '@/utils/stateSetter';
import { initialState } from './state';

import { IS_LOADING_MUTATION } from '@/store/mutations';

export const REGISTER_MUTATION = 'REGISTER_MUTATION';
export const LOGIN_MUTATION = 'LOGIN_MUTATION';
export const LOGOUT_MUTATION = 'LOGOUT_MUTATION';

export const mutations = {

  REGISTER_MUTATION: (state: State, payload: any) => (set(state, payload)),

  LOGIN_MUTATION: (state: State, payload: any) => (set(state, payload)),

  LOGOUT_MUTATION: (state: State, payload: any) => (set(state, payload)),

  RESET_MUTATION: (state: State, payload: any) => (set(state, initialState())),

  IS_LOADING_MUTATION,
};
