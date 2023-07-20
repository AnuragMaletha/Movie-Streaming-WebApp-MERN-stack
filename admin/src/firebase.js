import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAtSUAijAyDrFaMciZzSF2rnsc7Z-DAyUE",
  authDomain: "netflix-clone-b7594.firebaseapp.com",
  projectId: "netflix-clone-b7594",
  storageBucket: "netflix-clone-b7594.appspot.com",
  messagingSenderId: "747971561235",
  appId: "1:747971561235:web:d607107089d7a0dbf83ce6",
  measurementId: "G-X3XH7ZQWNX"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export  default storage;
