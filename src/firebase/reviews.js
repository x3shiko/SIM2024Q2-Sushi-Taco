import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { currentUser, firestore } from "./firebase";

class Reviews {
  constructor() {
    this.db = firestore;
  }

  async createReview(agentID, review) {
    while (!currentUser) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100 milliseconds
    }
    try {
      const reviewsCollectionRef = collection(this.db, "reviews");
      await addDoc(reviewsCollectionRef, {
        agentID: agentID,
        review: review,
        reviewByUserID: currentUser.uid,
      });
      console.log(
        `Successfully added review:${review} to user ID ${agentID} by user ID ${currentUser.uid}`
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getReviews() {
    while (!currentUser) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100 milliseconds
    }

    const reviewsCollectionRef = collection(this.db, "reviews");
    const q = query(
        reviewsCollectionRef,
      where("agentID", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
        reviews.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return reviews;
  }
}

export const reviews = new Reviews();
