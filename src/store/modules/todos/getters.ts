import State from '@/models/todo/todo.state';
import { STORE_TODOS_MODULE } from '@/constants';

export const ALL_TODOS = `${STORE_TODOS_MODULE}/ALL_TODOS`;
export const SELECTED_FILTER = `${STORE_TODOS_MODULE}/SELECTED_FILTER`;
export const FILTER_VALUES = `${STORE_TODOS_MODULE}/FILTER_VALUES`;

export const getters = {
  ALL_TODOS: (state: State) => state.todos,
  SELECTED_FILTER: (state: State) => state.selectedFilter,
  FILTER_VALUES: (state: State) => state.filterValues,
};
