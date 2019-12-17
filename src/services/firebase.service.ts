import firebase from 'firebase/app';
import { db } from '@/main';
import User from '@/models/auth/user';

const COLLECTION = {
  USERS: 'users',
  TODOS: 'todos',
};

export const REGISTER = async (user: User) => {
  const response: any = await firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password);
  await db.collection(COLLECTION.USERS)
    .doc(response.user.uid)
    .set({ email: user.email });
};

export const LOGIN = async (user: User) => {
  return await firebase.auth().
    signInWithEmailAndPassword(user.email, user.password);
};

export const LOGOUT = async () => {
  return await firebase.auth().signOut();
};

export const GET_TODOS = async () => {
  const user: any = firebase.auth().currentUser;
  const response = await db.collection(COLLECTION.TODOS)
    .where('userId', '==', user.uid).get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return response;
};

export const GET_TODO = async (id: any) => {
  const response = await db.collection(COLLECTION.TODOS)
    .doc(id)
    .get()
    .then((todo) => todo.data());
  return response;
};

export const ADD_TODO = async (todo: any) => {
  const user: any = firebase.auth().currentUser;
  todo.userId = user.uid;
  const response = await db.collection(COLLECTION.TODOS)
    .add(todo).then((data) => {
      return data.id;
    });
  return response;

};

export const UPDATE_TODO = async (todo: any) => {
  return await db.collection(COLLECTION.TODOS)
    .doc(todo.id)
    .update(todo);
};

export const DELETE_TODO = async (id: any) => {
  return await db.collection(COLLECTION.TODOS)
    .doc(id)
    .delete();
};
