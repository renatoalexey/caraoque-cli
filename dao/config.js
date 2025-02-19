//import firebase from 'firebase/compat/app';
//import '@firebase/auth';
//import '@firebase/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyBqvinaZfOJXwc2J5KfPgbuuzaIDXUfRDY',
  authDomain: 'caraoque-716e3.firebaseapp.com',
  databaseURL: 'https://default.firebaseio.com',
  projectId: 'caraoque-716e3',
  storageBucket: 'caraoque-716e3.firebasestorage.app',
  messagingSenderId: '536029755363',
  appId: '1:536029755363:web:687f149474baf59bba92d6',
  measurementId: "G-WJ8BV3TKGP"
};

//if (!firebase.apps.length) {
 // firebase.initializeApp(firebaseConfig);
//}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };