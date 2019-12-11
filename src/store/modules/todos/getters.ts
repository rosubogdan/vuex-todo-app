import State from '@/models/todo/todo.state';
import { STORE_TODOS_MODULE } from '@/constants';

export const ALL_TODOS = `${STORE_TODOS_MODULE}/ALL_TODOS`;
export const PER_PAGE = `${STORE_TODOS_MODULE}/PER_PAGE`;
export const PER_PAGE_OPTIONS = `${STORE_TODOS_MODULE}/PER_PAGE_OPTIONS`;
export const IS_LOADING = `${STORE_TODOS_MODULE}/IS_LOADING`;
export const HAS_ERROR = `${STORE_TODOS_MODULE}/HAS_ERROR`;
export const ERROR_MESSAGE = `${STORE_TODOS_MODULE}/ERROR_MESSAGE`;
export const SUCCESS_MESSAGE = `${STORE_TODOS_MODULE}/SUCCESS_MESSAGE`;

export const getters = {
  ALL_TODOS: (state: State) => state.todos,
  PER_PAGE: (state: State) => state.perPage,
  PER_PAGE_OPTIONS: (state: State) => state.perPageOptions,
  IS_LOADING: (state: State) => state.isLoading,
  HAS_ERROR: (state: State) => state.hasError,
  ERROR_MESSAGE: (state: State) => state.errorMessage,
  SUCCESS_MESSAGE: (state: State) => state.successMessage,
};
