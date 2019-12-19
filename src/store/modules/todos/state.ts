import State from '@/models/todo/todo.state';
import Todo from '@/models/todo/todo';

export const initialState = (): State => ({
  todos: [],
  todo: {} as Todo,
  perPage: 5,
  perPageOptions: [5, 10, 20, 50],
  isLoading: false,
  hasError: false,
  errorMessage: '',
  successMessage: '',
});
