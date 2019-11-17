import State from '@/models/auth/user.state';
import User from '@/models/auth/user';

export const REGISTER_MUTATION = 'REGISTER_MUTATION';
export const LOGIN_MUTATION = 'LOGIN_MUTATION';
export const LOGOUT_MUTATION = 'LOGOUT_MUTATION';

export const mutations = {

  REGISTER_MUTATION: (state: State, { status, message }: { status: boolean, message?: string }) => {
    state.registerStatus = status;
    state.registerMessage = message
  },

  LOGIN_MUTATION: (state: State, { user, status, message }: { user: User, status: boolean, message?: string }) => {
    state.user = user;
    state.isLoggedIn = status;
    state.loginStatus = status;
    state.loginMessage = message;
  },

  LOGOUT_MUTATION: (state: State, user: User) => {
    state.user = user;
    state.isLoggedIn = false;
  }

};