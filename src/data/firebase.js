import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB-qoV9hc3g81F6O37I66AWXYjQjlIKL5s",
  authDomain: "pokemongame-367d1.firebaseapp.com",
  databaseURL: "https://pokemongame-367d1-default-rtdb.firebaseio.com",
  projectId: "pokemongame-367d1",
  storageBucket: "pokemongame-367d1.appspot.com",
  messagingSenderId: "259713470234",
  appId: "1:259713470234:web:528bb1fac363acc351e6a3"
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;