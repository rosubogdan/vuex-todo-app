import firebase from 'firebase/app';
import { db } from '@/main';
import User from '@/models/auth/user';


const USERS = 'users';
const TODOS = 'todos';

export const REGISTER = async (user: User) => {
  const response: any = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  await db.collection(USERS)
    .doc(response.user.uid)
    .set({
      uid: response.user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });

  const currentUser = firebase.auth().currentUser;
  if (currentUser) { await currentUser.sendEmailVerification(); }
};

export const LOGIN = async (user: User) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

export const LOGOUT = async () => {
  return await firebase.auth().signOut();
};

export const GET_TODOS = async () => {
  const user: any = firebase.auth().currentUser;
  const query = await db.collection(TODOS)
    .where('userId', '==', user.uid)
    .get();
  // .orderBy('updatedAt', 'desc')

  return query.docs.map((doc) => doc.data());
};

export const GET_TODO = async (id: any) => {
  const query = await db.collection(TODOS).doc(id).get();
  return query.data();
};

export const ADD_TODO = async (todo: any) => {
  const user: any = firebase.auth().currentUser;
  todo.userId = user.uid;
  const query = await db.collection(TODOS).add(todo);
  return query.id;
};

export const UPDATE_TODO = async (todo: any) => {
  return await db.collection(TODOS).doc(todo.id).update(todo);
};

export const DELETE_TODO = async (id: any) => {
  return await db.collection(TODOS).doc(id).delete();
};
