import State from '@/models/todo/todo.state';
import Todo from '@/models/todo/todo';

export const GET_TODOS_MUTATION = 'GET_TODOS_MUTATION';
export const ADD_TODO_MUTATION = 'ADD_TODO_MUTATION';
export const UPDATE_TODO_MUTATION = 'UPDATE_TODO_MUTATION';
export const DELETE_TODO_MUTATION = 'DELETE_TODO_MUTATION';
export const UPDATE_FILTER_MUTATION = 'UPDATE_FILTER_MUTATION';

export const mutations = {
  GET_TODOS_MUTATION: (state: State, todos: Todo[]) => (state.todos = todos),

  ADD_TODO_MUTATION: (state: State, todo: Todo) => {
    state.todos.unshift(todo);
  },

  UPDATE_TODO_MUTATION: (state: State, todo: Todo) => {
    const index = state.todos.findIndex((item: Todo) => item.id === todo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, todo);
    }
  },

  UPDATE_FILTER_MUTATION: (state: State, filter: number) => (state.selectedFilter = filter),

  DELETE_TODO_MUTATION: (state: State, id: number) => (state.todos = state.todos.filter((todo: Todo) => todo.id !== id)),

};
