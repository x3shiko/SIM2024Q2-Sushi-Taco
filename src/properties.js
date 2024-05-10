import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { currentUser } from './firebase/firebase';

class Properties{

    constructor(){
        this.db = getFirestore();
    }

    getProperties = async () => {
        const propertiesCollection = collection(this.db, 'properties');
        const propertiesDoc = await getDocs(propertiesCollection)
        const propertiesData = propertiesDoc.docs.map(doc => {
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        return propertiesData;
    }

    getSoldProperties = async () => {
        const propertiesCollection = collection(this.db, 'properties');
        const propertiesDoc = await getDocs(propertiesCollection)
        const propertiesData = propertiesDoc.docs.map(doc => {
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        return propertiesData;
    }

    getSavedProperties = async () => {
        // Wait for currentUser to be defined
        while (!currentUser) {
          await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds
        }
        
        const propertiesCollection = collection(this.db, 'properties');
        const q = query(propertiesCollection, where("userIDs", "array-contains", currentUser.uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs)
        const properties = [];
        querySnapshot.forEach((doc) => {
          properties.push({
            id: doc.id,
            ...doc.data()
          });
        });
        console.log(properties)
        return properties;
      }
}

export const properties = new Properties();

