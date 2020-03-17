import User from '@/models/auth/user';

interface State {
  user: Partial<User>;
  alert: {};
  isLoggedIn: boolean;
  isLoading: boolean;
}

export default State;
