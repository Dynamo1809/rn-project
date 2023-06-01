import db from '../../firebase/config';

export const authSignUpUser =
  ({ username, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authSignOutUser =
  ({ username, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().createUserWithEmailAndPassword();
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };
