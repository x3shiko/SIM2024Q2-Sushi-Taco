import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc
} from "firebase/firestore";
import { currentUser } from "./firebase/firebase";
import { storage } from "./firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";

class Properties {
  constructor() {
    this.db = getFirestore();
  }

  getProperties = async () => {
    const propertiesCollection = collection(this.db, "properties");
    const propertiesDoc = await getDocs(propertiesCollection);
    const propertiesData = propertiesDoc.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return propertiesData;
  };

  getSoldProperties = async () => {
    const propertiesCollection = collection(this.db, "properties");
    const propertiesDoc = await getDocs(propertiesCollection);
    const propertiesData = propertiesDoc.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return propertiesData;
  };

  getSavedProperties = async () => {
    // Wait for currentUser to be defined
    while (!currentUser) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100 milliseconds
    }

    const propertiesCollection = collection(this.db, "properties");
    const q = query(
      propertiesCollection,
      where("savedByUserID", "array-contains", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    const properties = [];
    querySnapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(properties);
    return properties;
  };

  createPropertyListing = async (file) => {
    // Create a reference to the storage location where you want to upload the file
    const storageRef = ref(storage, "images/" + file.name);

    // Upload the file to the specified storage location
    await uploadBytes(storageRef, file);
  };

  getSellingProperties = async () => {
    // Wait for currentUser to be defined
    while (!currentUser) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100 milliseconds
    }

    const propertiesCollection = collection(this.db, "properties");
    const q = query(
      propertiesCollection,
      where("ownByUserID", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    const properties = [];
    querySnapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(properties);
    return properties;
  };

  async updateProperties(propertyID, fieldToUpdate){
    const propertyDocRef = doc(this.db, "properties", propertyID);
    await updateDoc(propertyDocRef, fieldToUpdate);
  };

  async deleteProperty(propertyID){
    const propertyDocRef = doc(this.db, "properties", propertyID);
    // Delete the document
    try {
        await deleteDoc(propertyDocRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
  }
}

export const properties = new Properties();
