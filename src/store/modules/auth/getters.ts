import State from '@/models/auth/user.state';
import { STORE_AUTH_MODULE } from '@/constants/';

export const USER = `${STORE_AUTH_MODULE}/USER`;
export const LOGIN_STATUS = `${STORE_AUTH_MODULE}/LOGIN_STATUS`;
export const REGISTER_STATUS = `${STORE_AUTH_MODULE}/REGISTER_STATUS`;
export const REGISTER_MESSAGE = `${STORE_AUTH_MODULE}/REGISTER_MESSAGE`;
export const LOGIN_MESSAGE = `${STORE_AUTH_MODULE}/LOGIN_MESSAGE`;


export const getters = {
  USER: (state: State) => state.user,
  REGISTER_STATUS: (state: State) => state.registerStatus,
  REGISTER_MESSAGE: (state: State) => state.registerMessage,
  LOGIN_STATUS: (state: State) => state.isLoggedIn,
  LOGIN_MESSAGE: (state: State) => state.loginMessage,
};
