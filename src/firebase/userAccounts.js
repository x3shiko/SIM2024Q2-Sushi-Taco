import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail  } from "firebase/auth";
import { auth } from "./firebase";
import { getFirestore, collection, getDocs, doc, updateDoc, setDoc, getDoc, arrayUnion, query, where} from 'firebase/firestore';
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";


class User{
    constructor(){
        this.db = getFirestore();
    }

    async updatePassword(userID, newPassword){
        const changePassword = httpsCallable(functions, 'changeUserPassword');
        await changePassword({userId: userID, newPassword: newPassword});
        console.log(`user ID ${userID} has successfully change password to ${newPassword}`)
    }

    createNewUser(email, password, firstName, lastName){
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
                        role: "None",
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
                    console.log(error);
                }
            };

            // Get the user's role using the inner function
            const userRole = await getUserRole(userID);
            return userRole;
        } catch (error) {
            console.log(error);
        }
    }

    doSignOut = () => {
        return auth.signOut();
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

    updateAccount = async (userID, fieldToUpdate) => {
        let success = false;
        const userDocRef = doc(this.db, 'users', userID);
        await updateDoc(userDocRef, fieldToUpdate);
        if (fieldToUpdate.password){
            const changePassword = httpsCallable(functions, 'changeUserPassword');
            await changePassword({userId: userID, newPassword: fieldToUpdate.password});
            console.log(`user ID ${userID} has successfully change password to ${fieldToUpdate.password}`)
            success = true;
        } else if (fieldToUpdate.email){
            const changeEmail = httpsCallable(functions, 'changeUserEmail');
            await changeEmail({userId: userID, newEmail: fieldToUpdate.email});
            console.log(`user ID ${userID} has successfully change password to ${fieldToUpdate.email}`)
            success = true;
        }
        success = true;
        return success
    }

    getUserSavedPropertiesID = async (userID) => {
        const userDocRef = doc(this.db, 'users', userID);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            
            // Check if the savedProperties field exists
            if (userData.savedProperties && userData.savedProperties.length > 0) {
                // Retrieve each property document using the IDs in savedProperties array
                const propertiesCollection = collection(this.db, 'properties');
                const savedPropertiesDocs = await Promise.all(userData.savedProperties.map(async (propertyId) => {
                    const propertyDocRef = doc(propertiesCollection, propertyId);
                    const propertyDocSnapshot = await getDoc(propertyDocRef);
                    
                    // Check if the property document exists
                    if (propertyDocSnapshot.exists()) {
                        return {
                            id: propertyDocSnapshot.id,
                            ...propertyDocSnapshot.data()
                        };
                    } else {
                        // Handle case where property document does not exist
                        console.error(`Property with ID ${propertyId} not found.`);
                        return null;
                    }
                }));
                
                // Filter out any null values (properties not found)
                const savedProperties = savedPropertiesDocs.filter(property => property !== null);
                
                return savedProperties;
            } else {
                // Handle case where savedProperties array is empty or undefined
                console.log('No properties saved.');
                return [];
            }
        } else {
            // Handle case where user document does not exist
            console.error('User document not found.');
            return null;
        }
    }

    async saveProperty(userID, propertyID){
        const userDocRef = doc(this.db, 'users', userID);
        await updateDoc(userDocRef, {
            savedProperties: arrayUnion(propertyID)
        });
        const propertyDocRef = doc(this.db, 'properties', propertyID);
        await updateDoc(propertyDocRef, {
            userIDs: arrayUnion(userID)
        });
    }

    async getAgents(){
        const usersCollectionRef = collection(this.db, 'users');
        const q = query(usersCollectionRef, where("role", "==", "Real Estate Agent"));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs)
        const agents = [];
        querySnapshot.forEach((doc) => {
            agents.push({
            id: doc.id,
            ...doc.data()
        });
        });
        console.log(agents)
        return agents;
    }
}
 
export const user = new User();

// class NewUser{

//     constructor(){
//         this.db = getFirestore();
//     }

//     createNewUser(email, password, firstName, lastName, roles){
//         return new Promise((resolve, reject) => {
//             createUserWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     const userID = userCredential.user.uid;
//                     const userDocRef = doc(this.db, 'users', userID); // 'users' is the collection name
//                     setDoc(userDocRef, {
//                         email: email,
//                         password: password,
//                         firstName: firstName,
//                         lastName: lastName,
//                         role: roles,
//                         status: "Active"
//                         // Add other details as needed
//                     }).then(() => {
//                         console.log("User data successfully created and stored in database");
//                         resolve(true);
//                     }).catch((error) => {
//                         console.error("Error storing user data:", error);
//                         reject(false);
//                     });
//                 }).catch((error) => {
//                     console.error("Error creating user:", error);
//                     reject(false); // Reject with false if there's an error creating user
//                 });
//         });
//     }
// }
// class UserSignIn {
//     constructor() {
//         this.db = getFirestore();
//     }

//     async doSignInWithEmailAndPassword(email, password) {
//         try {
//             // Sign in the user
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const userID = userCredential.user.uid;

//             // Define the inner function to get the user's role
//             const getUserRole = async (userId) => {
//                 try {
//                     // Get the user document from Firestore
//                     const userDocRef = doc(this.db, 'users', userId);
//                     const userDocSnapshot = await getDoc(userDocRef);

//                     // Check if the user document exists
//                     if (userDocSnapshot.exists()) {
//                         const userData = userDocSnapshot.data();

//                         // Check if the user has a role field
//                         if (userData.role) {
//                             return userData.role;
//                         } else {
//                             return "None";
//                         }
//                     } else {
//                         return "None";
//                     }
//                 } catch (error) {
//                     console.log(error);
//                 }
//             };

//             // Get the user's role using the inner function
//             const userRole = await getUserRole(userID);
//             return userRole;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// class UserSignOut{
//     doSignOut = () => {
//         return auth.signOut();
//     }
// }

// class ExistingUsers{
//     constructor(){
//         this.db = getFirestore();
//     }

//     getAccounts = async () => {
//         const accountsCollection = collection(this.db, 'users');
//         const accountsSnapshot = await getDocs(accountsCollection);
//         const accountsData = accountsSnapshot.docs.map(doc => {
//             return{
//                 id:doc.id,
//                 ...doc.data()
//             }
//         })
//         return accountsData;
//     }
// }

// class UpdateUser{
//     constructor(){
//         this.db = getFirestore();
//     }

//     updateAccount = async (userID, fieldToUpdate) => {
//         const userDocRef = doc(this.db, 'users', userID);
//         await updateDoc(userDocRef, fieldToUpdate);
//     }
// }

// export const updateUser = new UpdateUser();
// export const userSignOut = new UserSignOut();
// export const userSignIn = new UserSignIn();
// export const newUser = new NewUser();
// export const existingUsers = new ExistingUsers();