import State from '@/models/auth/user.state';
import { STORE_AUTH_MODULE } from '@/constants/';

export const USER = `${STORE_AUTH_MODULE}/USER`;
export const LOGIN_STATUS = `${STORE_AUTH_MODULE}/LOGIN_STATUS`;
export const IS_LOADING = `${STORE_AUTH_MODULE}/IS_LOADING`;
export const HAS_ERROR = `${STORE_AUTH_MODULE}/HAS_ERROR`;
export const ERROR_MESSAGE = `${STORE_AUTH_MODULE}/ERROR_MESSAGE`;


export const getters = {
  USER: (state: State) => state.user,
  LOGIN_STATUS: (state: State) => state.isLoggedIn,
  IS_LOADING: (state: State) => state.isLoading,
  HAS_ERROR: (state: State) => state.hasError,
  ERROR_MESSAGE: (state: State) => state.errorMessage,
};
