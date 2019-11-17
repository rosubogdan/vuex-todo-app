import User from '@/models/auth/user';

interface State {
  user: User;
  isLoggedIn: boolean;
  registerStatus: boolean | null;
  registerMessage?: string;
  loginStatus: boolean | null;
  loginMessage?: string;
}

export default State;
