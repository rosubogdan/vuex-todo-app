import axios, { AxiosResponse } from 'axios';
import Todo from '@/models/todo/todo';

import { API_URL } from '@/constants';

export const getTodo = async (): Promise<AxiosResponse<any>> => {
  return await axios.get(`${API_URL}?_sort=id&_order=desc`);

};

export const getFiltered = async (limit: number): Promise<AxiosResponse<any>> => {
  return await axios.get(`${API_URL}?_limit=${limit}`);
};

export const addNewTodo = async (todo: Todo): Promise<AxiosResponse<any>> => {
  return await axios.post(API_URL, todo);
};

export const updateTodo = async (todo: Todo): Promise<AxiosResponse<any>> => {
  return await axios.put(`${API_URL}/${todo.id}`, todo);
};

export const deleteTodo = async (id: number): Promise<AxiosResponse<any>> => {
  return await axios.delete(`${API_URL}/${id}`);
};
