import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail  } from "firebase/auth";
import { auth } from "./firebase";
import { getFirestore, collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';

class NewUser{

    constructor(){
        this.db = getFirestore();
    }

    createNewUser(email, password, firstName, lastName, roles){
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const userID = userCredential.user.uid;
                    const userDocRef = doc(this.db, 'users', userID); // 'users' is the collection name
                    setDoc(userDocRef, {
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        role: roles,
                        status: "Active"
                        // Add other details as needed
                    }).then(() => {
                        console.log("User data successfully created and stored in database");
                        resolve(true);
                    }).catch((error) => {
                        console.error("Error storing user data:", error);
                        reject(false);
                    });
                }).catch((error) => {
                    console.error("Error creating user:", error);
                    reject(false); // Reject with false if there's an error creating user
                });
        });
    }
}

class UserSignIn{
    doSignInWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
}

class UserSignOut{
    doSignOut = () => {
        return auth.signOut();
    }
}

class ExistingUsers{
    constructor(){
        this.db = getFirestore();
    }

    getAccounts = async () => {
        const accountsCollection = collection(this.db, 'users');
        const accountsSnapshot = await getDocs(accountsCollection);
        const accountsData = accountsSnapshot.docs.map(doc => {
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        return accountsData;
    }
}

export const userSignOut = new UserSignOut();
export const userSignIn = new UserSignIn();
export const newUser = new NewUser();
export const existingUsers = new ExistingUsers();