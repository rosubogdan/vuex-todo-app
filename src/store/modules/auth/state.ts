import State from '@/models/auth/user.state';

export const initialState = (): State => ({
  user: {},
  isLoggedIn: false,
  isLoading: false,
  hasError: false,
  errorMessage: '',
});

