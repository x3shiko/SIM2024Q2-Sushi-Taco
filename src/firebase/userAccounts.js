import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail  } from "firebase/auth";
import { auth } from "./firebase";
import { getFirestore, collection, getDocs, doc, updateDoc, setDoc, getDoc} from 'firebase/firestore';

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
class UserSignIn {
    constructor() {
        this.db = getFirestore();
    }

    async doSignInWithEmailAndPassword(email, password) {
        try {
            // Sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userID = userCredential.user.uid;

            // Define the inner function to get the user's role
            const getUserRole = async (userId) => {
                try {
                    // Get the user document from Firestore
                    const userDocRef = doc(this.db, 'users', userId);
                    const userDocSnapshot = await getDoc(userDocRef);

                    // Check if the user document exists
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();

                        // Check if the user has a role field
                        if (userData.role) {
                            return userData.role;
                        } else {
                            return "None";
                        }
                    } else {
                        return "None";
                    }
                } catch (error) {
                    console.error("Error getting user role:", error);
                    throw error;
                }
            };

            // Get the user's role using the inner function
            const userRole = await getUserRole(userID);
            return userRole;
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
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