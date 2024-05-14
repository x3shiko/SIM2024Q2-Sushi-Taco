import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  collection,
  addDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { currentUser } from "./firebase";

class Ratings {
  constructor() {
    this.db = getFirestore();
  }

  async createRating(agentID, rating, byUserID) {
    while (!currentUser) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100 milliseconds
    }
    try {
      const reviewsCollectionRef = collection(this.db, "ratings");
      await addDoc(reviewsCollectionRef, {
        agentID: agentID,
        rating: rating,
        reviewByUserID: currentUser.uid,
      });
      console.log(
        `Successfully added rating (${rating} star) to user ID: ${agentID} by user ID: ${currentUser.uid}`
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getRatings() {
    while (!currentUser) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100 milliseconds
    }

    const ratingsCollectionRef = collection(this.db, "ratings");
    const q = query(
        ratingsCollectionRef,
      where("agentID", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    const ratings = [];
    querySnapshot.forEach((doc) => {
      ratings.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return ratings;
  }
}

export const ratings = new Ratings();
