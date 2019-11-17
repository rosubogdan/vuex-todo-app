import axios from 'axios';
import Todo from '@/models/todo/todo';

import { API_URL } from '@/constants';

export const getTodo = async () => {
  return await axios.get(`${API_URL}`);

};

export const getFiltered = async (limit: number) => {
  return await axios.get(`${API_URL}?_limit=${limit}`);
};

export const addNewTodo = async (todo: Todo) => {
  return await axios.post(API_URL, todo);
};

export const updateTodo = async (todo: Todo) => {
  return await axios.put(`${API_URL}/${todo.id}`, todo);
};

export const deleteTodo = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};
