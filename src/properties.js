import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
  addDoc
} from "firebase/firestore";
import { currentUser } from "./firebase/firebase";
import { storage } from "./firebase/firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
        contentType: contentType // Adjust according to your image type
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      // Create a document in the "properties" collection
      const propertiesCollection = collection(this.db, "properties");
      const newProperty = await addDoc(propertiesCollection, {
        address: address,
        description: description,
        image: downloadURL,
        ownByUserID: sellerID,
        price: price,
        savedByUserID: [],
        status: "unsold",
        // Add more fields as needed
      });
      return true; // Return true for success
    } catch (error) {
      console.log(error)
      return false; // Return false for failure
    }
  }

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

  async updateProperties(propertyID, fieldToUpdate) {
    const propertyDocRef = doc(this.db, "properties", propertyID);
    await updateDoc(propertyDocRef, fieldToUpdate);
  }

  async deleteProperty(propertyID) {
    const propertyDocRef = doc(this.db, "properties", propertyID);
    // Delete the document
    try {
      await deleteDoc(propertyDocRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  async searchPropertyByLocation(location) {
    const properties = await this.getProperties();
    return properties.filter((property) =>
      Object.values(property).some((value) =>
        String(value).toLowerCase().includes(location.toLowerCase())
      )
    );
  }
}

export const properties = new Properties();
