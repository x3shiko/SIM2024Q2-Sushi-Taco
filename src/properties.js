import { getFirestore, collection, getDocs, doc, updateDoc, query } from 'firebase/firestore';
import { where } from 'firebase/firestore';
class Properties{

    constructor(){
        this.db = getFirestore();
    }

    getProperties = async () => {
        const propertiesCollection = collection(this.db, 'properties');
        const querySnapshot = await query(propertiesCollection, where('status', '==', 'unsold'));
        const propertiesData = querySnapshot.docs.map(doc => {
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        return propertiesData;
    }
}

class SoldProperties{

    constructor(){
        this.db = getFirestore();
    }

    getSoldProperties = async () => {
        const propertiesCollection = collection(this.db, 'properties');
        const querySnapshot = await query(propertiesCollection, where('status', '==', 'sold'));
        const propertiesData = querySnapshot.docs.map(doc => {
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        return propertiesData;
    }
}

export const properties = new Properties();
export const soldProperties = new SoldProperties();

