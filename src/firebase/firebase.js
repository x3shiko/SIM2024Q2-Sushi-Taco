import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


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

const auth = getAuth(firebaseApp);

export {firebaseApp, auth};
  