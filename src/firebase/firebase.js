import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCPppZvejmG751GVOKJ8TfQ-POrYuZ-2gs",
    authDomain: "csit314-sushitaco.firebaseapp.com",
    projectId: "csit314-sushitaco",
    storageBucket: "csit314-sushitaco.appspot.com",
    messagingSenderId: "596002154103",
    appId: "1:596002154103:web:0cb2254d84503b30e80872",
    measurementId: "G-ETMZYXZ6KF"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const auth = getAuth(firebaseApp);

const functions = getFunctions(firebaseApp)

let currentUser

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    currentUser = user
    console.log(user.uid); // Print the user's ID
  } else {
    // No user is signed in
    console.log("No user signed in");
  }
});

export {firebaseApp, auth, functions, currentUser, storage};
  