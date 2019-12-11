import {
  getTodo,
  getFiltered,
  addNewTodo,
  updateTodo,
  deleteTodo,
} from './api.service';

import {
  REGISTER,
  LOGIN,
  LOGOUT,
} from './firebase.service';

import { getPriority, getStatus } from './todo.service';


export {
  REGISTER,
  LOGIN,
  LOGOUT,
  getTodo,
  getFiltered,
  addNewTodo,
  updateTodo,
  deleteTodo,
  getPriority,
  getStatus,
};
