import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

import { USERS, TODOS } from '../collections';

export const createUser = functions.firestore
  .document(`${USERS}/{id}`)
  .onCreate(async (snapshot, context) => {
    try {
      return snapshot.ref.set({
        id: context.params.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    catch (error) {
      console.log(error);
      return false;
    }
  });

export const updateUser = functions.firestore
  .document(`${USERS}/{id}`)
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

export const deleteUser = functions.firestore
  .document(`${USERS}/{id}`)
  .onDelete(async (snapshot, context) => {
    const todos = await db.collection(TODOS).where('userId', '==', context.params.id).get();
    const batch = db.batch();
    todos.forEach((doc) => { batch.delete(doc.ref); });
    await batch.commit();
  })