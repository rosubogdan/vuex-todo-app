import Todo from '@/models/todo/todo';

interface State {
  todos: Todo[];
  todo: Todo;
  perPage: number;
  perPageOptions: number[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  successMessage: string;
}

export default State;
