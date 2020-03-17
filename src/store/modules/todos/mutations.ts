import State from '@/models/todo/todo.state';
import Todo from '@/models/todo/todo';

import { set } from '@/utils/stateSetter';

import { initialState } from '@/store/modules/todos/state';

import { IS_LOADING_MUTATION } from '@/store/mutations';

export const GET_TODOS_MUTATION = 'GET_TODOS_MUTATION';
export const ADD_TODO_MUTATION = 'ADD_TODO_MUTATION';
export const UPDATE_TODO_MUTATION = 'UPDATE_TODO_MUTATION';
export const DELETE_TODO_MUTATION = 'DELETE_TODO_MUTATION';
export const UPDATE_PER_PAGE_MUTATION = 'UPDATE_PER_PAGE_MUTATION';
export const RESET_MUTATION = 'RESET_MUTATION';

export const mutations = {
  GET_TODOS_MUTATION: (state: State, payload: any): void => set(state, payload),

  ADD_TODO_MUTATION: (state: State, payload: any): void => {
    if (payload.todo) { state.todos.unshift(payload.todo); }
    set(state, payload);
  },

  UPDATE_TODO_MUTATION: (state: State, payload: any): void => {
    if (payload.todo) {
      state.todos = state.todos.map((todo: Todo) => {
        if (todo.id === payload.todo.id) {
          todo = payload.todo;
        }
        return todo;
      });
    }
    set(state, payload);
  },

  UPDATE_PER_PAGE_MUTATION: (state: State, value: number): number => state.perPage = value,

  DELETE_TODO_MUTATION: (state: State, id: number): void => {
    state.todos = state.todos.filter((todo: Todo) => todo.id !== id);
  },

  RESET_MUTATION: (state: State, payload: any): void => set(state, initialState()),

  IS_LOADING_MUTATION,
};
