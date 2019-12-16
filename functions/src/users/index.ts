import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { USERS } from '../collections';

admin.initializeApp();

export const sendVerificationEmail = functions.auth
  .user()
  .onCreate((user: any) => {
    user.sendVerificationEmail()
      .then(() => console.log(`Email sent to ${user.email}`))
      .catch((error: any) => console.log(error));
  });

export const createUser = functions.firestore
  .document(`${USERS}/{id}`)
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
  .onDelete((snapshot) => {
    // do some stuff ex: delete all related collections
  })