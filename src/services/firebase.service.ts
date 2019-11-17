import firebase from 'firebase/app';
import User from '@/models/auth/user';

export const REGISTER = async (user: User) => {
  return await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

export const LOGIN = async (user: User) => {
  return await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

export const LOGOUT = async () => {
  return await firebase.auth().signOut();
};