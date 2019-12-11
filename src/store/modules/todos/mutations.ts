import State from '@/models/todo/todo.state';
import Todo from '@/models/todo/todo';

export const GET_TODOS_MUTATION = 'GET_TODOS_MUTATION';
export const ADD_TODO_MUTATION = 'ADD_TODO_MUTATION';
export const UPDATE_TODO_MUTATION = 'UPDATE_TODO_MUTATION';
export const DELETE_TODO_MUTATION = 'DELETE_TODO_MUTATION';
export const UPDATE_PER_PAGE_MUTATION = 'UPDATE_PER_PAGE_MUTATION';
export const IS_LOADING_MUTATION = 'IS_LOADING_MUTATION';

export const mutations = {
  GET_TODOS_MUTATION: (state: State, { todos, hasError, errorMessage }: State) => {
    state.todos = todos;
    state.hasError = hasError;
    state.errorMessage = errorMessage;
  },

  ADD_TODO_MUTATION: (state: State, { todo, hasError, errorMessage }: State) => {
    if (todo) { state.todos.unshift(todo); }
    state.hasError = hasError;
    state.errorMessage = errorMessage;
  },

  UPDATE_TODO_MUTATION: (state: State, { todo, hasError, errorMessage }: State) => {
    if (todo) {
      const index = state.todos.findIndex((item: Todo) => item.id === todo.id);
      if (index !== -1) {
        state.todos[index] = todo;
      }
    }
    state.hasError = hasError;
    state.errorMessage = errorMessage;
  },

  UPDATE_PER_PAGE_MUTATION: (state: State, value: number) => (state.perPage = value),

  DELETE_TODO_MUTATION: (state: State, id: number) => {
    state.todos = state.todos.filter((todo: Todo) => todo.id !== id);
  },

  IS_LOADING_MUTATION: (state: State, { isLoading }: any) => (state.isLoading = isLoading),

};
