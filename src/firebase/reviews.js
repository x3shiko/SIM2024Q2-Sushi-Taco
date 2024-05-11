import { getFirestore, doc, updateDoc, setDoc, getDocs, collection, addDoc, arrayUnion, query, where } from 'firebase/firestore';
import { currentUser } from './firebase';

class Reviews{

    constructor(){
        this.db = getFirestore();
    }

    async createReview(userID, review){
        try{
            const reviewsCollectionRef = collection(this.db, 'reviews');
            await addDoc(reviewsCollectionRef, {
                agentID: userID,
                review: review,
            })
            console.log(`Successfully added review:${review} to user ID ${userID}`)
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

export const reviews = new Reviews();