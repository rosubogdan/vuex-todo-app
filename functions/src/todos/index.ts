import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { TODOS } from '../collections';

admin.initializeApp();

export const createTodo = functions.firestore
  .document(`${TODOS}/{id}`)
  .onCreate(async (snapshot) => {
    try {
      return snapshot.ref.set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    catch (error) {
      console.log(error);
      return false;
    }
  });

export const updateTodo = functions.firestore
  .document(`${TODOS}/{id}`)
  .onUpdate(async (change) => {
    const currentData: any = change.after.data();
    const beforeData: any = change.before.data();

    if (currentData.updateTodo === beforeData.updatedAt) return null;
    try {
      return change.after.ref.set({
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    catch (error) {
      console.log(error);
      return false;
    }
  });
