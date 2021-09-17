import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC9T_hSoP-pRDV0LCEF-nxsqJg5v8DmMPU",
    authDomain: "clone-52597.firebaseapp.com",
    projectId: "clone-52597",
    storageBucket: "clone-52597.appspot.com",
    messagingSenderId: "1022007045615",
    appId: "1:1022007045615:web:3e04e37056638b3ba65a1a",
    measurementId: "G-F1BNKGTHM4"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};