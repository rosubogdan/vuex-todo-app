import firebase from 'firebase/app';
import { db } from '@/main';
import User from '@/models/auth/user';

const COLLECTION = {
  USERS: 'users',
  TODOS: 'todos',
};

export const REGISTER = async (user: User) => {
  const response: any = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  await db.collection(COLLECTION.USERS).doc(response.user.uid).set({ email: user.email });
};

export const LOGIN = async (user: User) => {
  return await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

export const LOGOUT = async () => {
  return await firebase.auth().signOut();
};

export const ADD_TODO = async (todo: any) => {
  const user: any = firebase.auth().currentUser;
  todo.userId = user.uid;
  const response = await db.collection(COLLECTION.TODOS).add(todo);
  return response;
};
