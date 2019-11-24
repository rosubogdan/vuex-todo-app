import Todo from '@/models/todo/todo';
import { STORE_TODOS_MODULE } from '@/constants';

import {
  getTodo,
  getFiltered,
  addNewTodo,
  updateTodo,
  deleteTodo
} from '@/services/api.service';

import {
  GET_TODOS_MUTATION,
  ADD_TODO_MUTATION,
  UPDATE_TODO_MUTATION,
  DELETE_TODO_MUTATION,
  UPDATE_FILTER_MUTATION,
} from '@/store/modules/todos/mutations';

export const FETCH_TODOS_ACTION = `${STORE_TODOS_MODULE}/FETCH_TODOS_ACTION`;
export const ADD_TODO_ACTION = `${STORE_TODOS_MODULE}/ADD_TODO_ACTION`;
export const UPDATE_TODO_ACTION = `${STORE_TODOS_MODULE}/UPDATE_TODO_ACTION`;
export const FILTER_TODOS_ACTION = `${STORE_TODOS_MODULE}/FILTER_TODOS_ACTION`;
export const DELETE_TODO_ACTION = `${STORE_TODOS_MODULE}/DELETE_TODO_ACTION`;

export const actions = {

  FETCH_TODOS_ACTION: async ({ commit }: any) => {
    try {
      const response = await getTodo();
      commit(GET_TODOS_MUTATION, response.data);
    } catch (error) {
      console.error(error);
    }

  },

  ADD_TODO_ACTION: async ({ commit }: any, todo: Todo) => {
    try {
      const response = await addNewTodo(todo);
      commit(ADD_TODO_MUTATION, response.data);
    } catch (error) {
      console.error(error);
    }
  },

  UPDATE_TODO_ACTION: async ({ commit }: any, todo: Todo) => {
    try {
      const response = await updateTodo(todo);
      commit(UPDATE_TODO_MUTATION, response);
    } catch (error) {
      console.error(error);
    }
  },

  FILTER_TODOS_ACTION: async ({ commit }: any, filter: number) => {
    try {
      const response = await getFiltered(filter);
      commit(UPDATE_FILTER_MUTATION, filter);
      commit(GET_TODOS_MUTATION, response.data);
    } catch (error) {
      console.error(error);
    }
  },

  DELETE_TODO_ACTION: async ({ commit }: any, id: number) => {
    try {
      await deleteTodo(id);
      commit(DELETE_TODO_MUTATION, id);
    } catch (error) {
      console.error(error);
    }
  },
};
