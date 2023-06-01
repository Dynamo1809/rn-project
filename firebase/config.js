import * as firebase from 'firebase';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCryorTzuKeNfAvT_OSXeO0RlgrgerLew0',
  authDomain: 'rn-project1809.firebaseapp.com',
  projectId: 'rn-project1809',
  storageBucket: 'rn-project1809.appspot.com',
  messagingSenderId: '594275388888',
  appId: '1:594275388888:web:3eaa804988213f8d86f6ad',
  measurementId: 'G-53H4GRH6DF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
