import Todo from '@/models/todo/todo';

import { STORE_TODOS_MODULE } from '@/constants';

import {
  getFiltered,
} from '@/services/api.service';

import {
  ADD_TODO,
  GET_TODOS,
  GET_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '@/services';

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
      const response = await GET_TODOS();
      commit(GET_TODOS_MUTATION, { todos: response });
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
      const id = await ADD_TODO(todo);
      const response = await GET_TODO(id);
      commit(ADD_TODO_MUTATION, { todo: response });
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
      await UPDATE_TODO(todo);
      const updatedTodo = await GET_TODO(todo.id);
      commit(UPDATE_TODO_MUTATION, { todo: updatedTodo });
      commit(IS_LOADING_MUTATION, { isLoading: false });

    } catch (error) {
      console.error(error);
      commit(UPDATE_TODO_MUTATION, { hasError: true, errorMessage: error.message });
      commit(IS_LOADING_MUTATION, { isLoading: false });
    }
  },

  CHANGE_PER_PAGE_ACTION: async ({ commit }: any, filter: number) => {
    // todo - use firebase pagination query
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
      await DELETE_TODO(id);
      commit(DELETE_TODO_MUTATION, id);
      commit(IS_LOADING_MUTATION, { isLoading: false });

    } catch (error) {
      console.error(error);
      commit(IS_LOADING_MUTATION, { isLoading: false });
    }
  },
};
