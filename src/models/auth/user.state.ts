import User from '@/models/auth/user';

interface State {
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export default State;
