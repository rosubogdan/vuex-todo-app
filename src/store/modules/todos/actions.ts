import Todo from '@/models/todo/todo';
import State from '@/models/todo/todo.state';

import { STORE_TODOS_MODULE } from '@/constants';

import {
  getTodo,
  getFiltered,
  addNewTodo,
  updateTodo,
  deleteTodo,
} from '@/services/api.service';

import {
  GET_TODOS_MUTATION,
  ADD_TODO_MUTATION,
  UPDATE_TODO_MUTATION,
  DELETE_TODO_MUTATION,
  UPDATE_PER_PAGE_MUTATION,
  IS_LOADING_MUTATION,
} from '@/store/modules/todos/mutations';

export const FETCH_TODOS_ACTION = `${STORE_TODOS_MODULE}/FETCH_TODOS_ACTION`;
export const ADD_TODO_ACTION = `${STORE_TODOS_MODULE}/ADD_TODO_ACTION`;
export const UPDATE_TODO_ACTION = `${STORE_TODOS_MODULE}/UPDATE_TODO_ACTION`;
export const CHANGE_PER_PAGE_ACTION = `${STORE_TODOS_MODULE}/CHANGE_PER_PAGE_ACTION`;
export const DELETE_TODO_ACTION = `${STORE_TODOS_MODULE}/DELETE_TODO_ACTION`;

export const actions = {

  FETCH_TODOS_ACTION: async ({ commit }: any) => {
    try {
      commit(IS_LOADING_MUTATION, { isLoading: true });
      const response = await getTodo();
      commit(GET_TODOS_MUTATION, { todos: response.data });
      commit(IS_LOADING_MUTATION, { isLoading: false });
    } catch (error) {
      console.error(error);
      commit(GET_TODOS_MUTATION, { hasError: true, errorMessage: error.message });
      commit(IS_LOADING_MUTATION, { isLoading: false });
    }

  },

  ADD_TODO_ACTION: async ({ commit }: any, todo: Todo) => {
    try {
      commit(IS_LOADING_MUTATION, { isLoading: true });
      const response = await addNewTodo(todo);
      commit(ADD_TODO_MUTATION, { todo: response.data });
      commit(IS_LOADING_MUTATION, { isLoading: false });
    } catch (error) {
      console.error(error);
      commit(ADD_TODO_MUTATION, { hasError: true, errorMessage: error.message });
      commit(IS_LOADING_MUTATION, { isLoading: false });
    }
  },

  UPDATE_TODO_ACTION: async ({ commit }: any, todo: Todo) => {
    try {
      commit(IS_LOADING_MUTATION, { isLoading: true });
      const response = await updateTodo(todo);
      commit(UPDATE_TODO_MUTATION, { todo: response });
      commit(IS_LOADING_MUTATION, { isLoading: false });

    } catch (error) {
      console.error(error);
      commit(UPDATE_TODO_MUTATION, { hasError: true, errorMessage: error.message });
      commit(IS_LOADING_MUTATION, { isLoading: false });
    }
  },

  CHANGE_PER_PAGE_ACTION: async ({ commit }: any, filter: number) => {
    try {
      commit(IS_LOADING_MUTATION, { isLoading: true });
      const response = await getFiltered(filter);
      commit(UPDATE_PER_PAGE_MUTATION, filter);
      commit(GET_TODOS_MUTATION, { todos: response.data });
      commit(IS_LOADING_MUTATION, { isLoading: false });
    } catch (error) {
      console.error(error);
      commit(IS_LOADING_MUTATION, { isLoading: false });

    }
  },

  DELETE_TODO_ACTION: async ({ commit }: any, id: number) => {
    try {
      commit(IS_LOADING_MUTATION, { isLoading: true });
      await deleteTodo(id);
      commit(DELETE_TODO_MUTATION, id);
      commit(IS_LOADING_MUTATION, { isLoading: false });

    } catch (error) {
      console.error(error);
      commit(IS_LOADING_MUTATION, { isLoading: false });
    }
  },
};
