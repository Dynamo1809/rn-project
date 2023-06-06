import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCryorTzuKeNfAvT_OSXeO0RlgrgerLew0',
  authDomain: 'rn-project1809.firebaseapp.com',
  projectId: 'rn-project1809',
  storageBucket: 'rn-project1809.appspot.com',
  messagingSenderId: '594275388888',
  appId: '1:594275388888:web:3eaa804988213f8d86f6ad',
  measurementId: 'G-53H4GRH6DF',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
