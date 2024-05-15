import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

class User {
  constructor() {
    this.db = getFirestore();
  }

  async createUser(email, password, firstName, lastName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userID = userCredential.user.uid;
      const userDocRef = doc(this.db, "users", userID);
      await setDoc(userDocRef, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: "None",
        status: "Active",
        // Add other details as needed
      });
      console.log("User data successfully created and stored in database");
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    }
  }

  async doSignInWithEmailAndPassword(email, password) {
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userID = userCredential.user.uid;
      const userDocRef = doc(this.db, "users", userID);
      const userDocSnapshot = await getDoc(userDocRef);

      // Check if the user document exists
      if (userDocSnapshot.exists()) {
        return userDocSnapshot.data();
      } else {
        //if user doesnt exist
        throw new Error("User document does not exist");
      }
    } catch (error) {
      throw error;
    }
  }

  async doSignOut(){
    await auth.signOut();
  };

  async getUsers() {
    const accountsCollection = collection(this.db, "users");
    const accountsSnapshot = await getDocs(accountsCollection);
    const accountsData = accountsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return accountsData;
  }

  async updateUser(userID, fieldToUpdate) {
    let success = false;
    const userDocRef = doc(this.db, "users", userID);
    await updateDoc(userDocRef, fieldToUpdate);
    if (fieldToUpdate.password) {
      const changePassword = httpsCallable(functions, "changeUserPassword");
      await changePassword({
        userId: userID,
        newPassword: fieldToUpdate.password,
      });
      console.log(
        `user ID ${userID} has successfully change password to ${fieldToUpdate.password}`
      );
      success = true;
    } else if (fieldToUpdate.email) {
      const changeEmail = httpsCallable(functions, "changeUserEmail");
      await changeEmail({ userId: userID, newEmail: fieldToUpdate.email });
      console.log(
        `user ID ${userID} has successfully change password to ${fieldToUpdate.email}`
      );
      success = true;
    }
    success = true;
    return success;
  }

  async getUserSavedPropertiesID(userID) {
    const userDocRef = doc(this.db, "users", userID);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();

      // Check if the savedProperties field exists
      if (userData.savedProperties && userData.savedProperties.length > 0) {
        // Retrieve each property document using the IDs in savedProperties array
        const propertiesCollection = collection(this.db, "properties");
        const savedPropertiesDocs = await Promise.all(
          userData.savedProperties.map(async (propertyId) => {
            const propertyDocRef = doc(propertiesCollection, propertyId);
            const propertyDocSnapshot = await getDoc(propertyDocRef);

            // Check if the property document exists
            if (propertyDocSnapshot.exists()) {
              return {
                id: propertyDocSnapshot.id,
                ...propertyDocSnapshot.data(),
              };
            } else {
              // Handle case where property document does not exist
              console.error(`Property with ID ${propertyId} not found.`);
              return null;
            }
          })
        );

        // Filter out any null values (properties not found)
        const savedProperties = savedPropertiesDocs.filter(
          (property) => property !== null
        );

        return savedProperties;
      } else {
        // Handle case where savedProperties array is empty or undefined
        console.log("No properties saved.");
        return [];
      }
    } else {
      // Handle case where user document does not exist
      console.error("User document not found.");
      return null;
    }
  }

  async getAgents() {
    const usersCollectionRef = collection(this.db, "users");
    const q = query(
      usersCollectionRef,
      where("role", "==", "Real Estate Agent")
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    const agents = [];
    querySnapshot.forEach((doc) => {
      agents.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(agents);
    return agents;
  }

  async getSellers() {
    const usersCollectionRef = collection(this.db, "users");
    const q = query(usersCollectionRef, where("role", "==", "Seller"));
    const querySnapshot = await getDocs(q);
    const sellers = [];
    querySnapshot.forEach((doc) => {
      sellers.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return sellers;
  }

  async searchUserByEmail(email) {
    const users = await this.getUsers();
    return users.filter((user) =>
      user.email && user.email.toLowerCase().includes(email.toLowerCase())
    );
  }
}

export const user = new User();
