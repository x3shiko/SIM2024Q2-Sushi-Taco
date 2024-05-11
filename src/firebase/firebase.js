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
// const serviceAccount = require('./csit314-sushitaco-firebase-adminsdk-2gk26-61d7b202d0.json');
// const admin = require("firebase-admin");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// async function changeUserPassword(userId, newPassword) {
//   try {
//     await admin.auth().updateUser(userId, { password: newPassword });
//     console.log("Password updated successfully!");
//   } catch (error) {
//     console.error("Error updating password:", error);
//   }
// }

// // Create admin user
// admin.auth().createUser({
//   email: 'SushiAndTaco@gmail.com',
//   password: '123123',
//   displayName: 'S&T Admin',
//   // Additional user properties can be added here
// })
//   .then((userRecord) => {
//     console.log('Successfully created new user:', userRecord.uid);
//   })
//   .catch((error) => {
//     console.error('Error creating user:', error);
//   });

export {firebaseApp, auth, functions, currentUser, storage};
  