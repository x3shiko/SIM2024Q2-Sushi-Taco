import { getFirestore, doc, updateDoc, setDoc, getDocs, collection, addDoc, arrayUnion, query, where } from 'firebase/firestore';
import { currentUser } from './firebase';

class Ratings{

    constructor(){
        this.db = getFirestore();
    }

    async createRating(userID, rating){
        try{
            const reviewsCollectionRef = collection(this.db, 'ratings');
            await addDoc(reviewsCollectionRef, {
                agentID: userID,
                rating: rating,
            })
            console.log(`Successfully added rating (${rating} star) to user ID ${userID}`)
            return true
        } catch(error){
            return false
        }
    };

    getReviews = async () => {
        // Wait for currentUser to be defined
        while (!currentUser) {
          await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds
        }
        const reviewsCollectionRef = collection(this.db, 'reviews');
        const q = query(reviewsCollectionRef, where("role", "===", "Real Estate Agent"));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs)
        const reviews = [];
        querySnapshot.forEach((doc) => {
            reviews.push({
            id: doc.id,
            ...doc.data()
          });
        });
        console.log(reviews)
        return reviews;
    }
}

export const ratings = new Ratings();