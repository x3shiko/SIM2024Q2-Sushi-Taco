import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
  addDoc,
  arrayUnion,
  getDoc
} from "firebase/firestore";
import { currentUser } from "./firebase/firebase";
import { storage } from "./firebase/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

class Properties {
  constructor() {
    this.db = getFirestore();
  }

  async getProperties() {
    const propertiesCollection = collection(this.db, "properties");
    const propertiesDoc = await getDocs(propertiesCollection);
    const propertiesData = propertiesDoc.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return propertiesData;
  }

  async getSoldProperties() {
    const propertiesCollection = collection(this.db, "properties");
    const propertiesDoc = await getDocs(propertiesCollection);
    const propertiesData = propertiesDoc.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return propertiesData;
  }

  async getSavedProperties() {
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
  }

  async createPropertyListing(file, sellerID, address, price, description) {
    //create property listing method
    try {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Map file extensions to content types
      const contentTypeMap = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        // Add more mappings as needed
      };

      // Get content type from map or default to 'application/octet-stream'
      const contentType =
        contentTypeMap[fileExtension] || "application/octet-stream";
      // Upload the image to Firebase Storage here if needed
      const storageRef = ref(storage, file.name);
      const metadata = {
        contentType: contentType, // Adjust according to your image type
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      // Create a document in the "properties" collection
      const propertiesCollection = collection(this.db, "properties");
      await addDoc(propertiesCollection, {
        address: address,
        description: description,
        image: downloadURL,
        ownByUserID: sellerID,
        price: price,
        savedByUserID: [],
        status: "unsold",
        view: 0
        // Add more fields as needed
      });
      return true; // Return true for success
    } catch (error) {
      console.log(error);
      return false; // Return false for failure
    }
  }

  async getSellingProperties() {
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
  }

  async updateProperties(propertyID, fieldToUpdate) {
    const propertyDocRef = doc(this.db, "properties", propertyID);
    await updateDoc(propertyDocRef, fieldToUpdate);
  }

  async deleteProperty(propertyID) {
    const propertyDocRef = doc(this.db, "properties", propertyID);
    const propertyDocSnapshot = await getDoc(propertyDocRef);
    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/csit314-sushitaco.appspot.com/o/";
    const startIndex = baseUrl.length;
    const endIndex = propertyDocSnapshot.data().image.indexOf("?alt=media");
    const filePath = decodeURIComponent(propertyDocSnapshot.data().image.substring(startIndex, endIndex));
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    await deleteDoc(propertyDocRef);
  }

  async searchPropertyByLocation(location) {
    const properties = await this.getProperties();
    return properties.filter(
      (property) =>
        property.address &&
        property.address.toLowerCase().includes(location.toLowerCase())
    );
  }

  async saveProperty(userID, propertyID) {
    const userDocRef = doc(this.db, "users", userID);
    await updateDoc(userDocRef, {
      savedProperties: arrayUnion(propertyID),
    });
    const propertyDocRef = doc(this.db, "properties", propertyID);
    await updateDoc(propertyDocRef, {
      savedByUserID: arrayUnion(userID),
    });
  }

  async addViewToProperty(propertyID){
    const propertyDocRef = doc(this.db, "properties", propertyID);
    const docSnapshot = await getDoc(propertyDocRef);
    const currentViews = docSnapshot.data().view
    const newViews = currentViews + 1
    await updateDoc(propertyDocRef, {
      view: newViews
    });
  }
}

export const properties = new Properties();
