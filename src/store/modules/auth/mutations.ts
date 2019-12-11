import State from '@/models/auth/user.state';

export const REGISTER_MUTATION = 'REGISTER_MUTATION';
export const LOGIN_MUTATION = 'LOGIN_MUTATION';
export const LOGOUT_MUTATION = 'LOGOUT_MUTATION';
export const IS_LOADING_MUTATION = 'IS_LOADING_MUTATION';

export const mutations = {

  REGISTER_MUTATION: (state: State, { hasError, errorMessage }: State) => {
    state.hasError = hasError;
    state.errorMessage = errorMessage;
  },

  LOGIN_MUTATION: (state: State, { user, hasError, errorMessage }: State) => {
    state.user = user;
    state.hasError = hasError;
    state.isLoggedIn = !hasError;
    state.errorMessage = errorMessage;
  },

  LOGOUT_MUTATION: (state: State, { user }: State) => {
    state.user = user;
    state.isLoggedIn = false;
  },

  IS_LOADING_MUTATION: (state: State, { isLoading }: State) => (state.isLoading = isLoading),

};
