import db from '../../firebase/config';
import { authSlice } from '../auth/authReducer';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: nickname,
      });

      const { uid, displayName } = await db.auth().currentUser;

      dispatch(updateUserProfile({ userId: uid, nickname: displayName }));
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, _) => {
  try {
    await db.auth().signOut();
    dispatch(authSignOut());
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, _) => {
  try {
    await db.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile({ userId: user.uid, nickname: user.displayName }));
      }
    });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
  }
};
