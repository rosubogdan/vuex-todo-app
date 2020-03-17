import State from '@/models/auth/user.state';

export const alert = {
  show: false,
  type: '',
  message: '',
  position: '',
};

export const initialState = (): State => ({
  user: {},
  alert,
  isLoggedIn: false,
  isLoading: false,
});
