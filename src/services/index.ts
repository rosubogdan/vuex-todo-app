import { getFiltered } from './api.service';

import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from './firebase.service';

import { getPriority, getStatus } from './todo.service';


export {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  getPriority,
  getStatus,
};
