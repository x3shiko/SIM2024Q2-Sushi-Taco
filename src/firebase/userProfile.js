import { getFirestore, doc, updateDoc, setDoc, getDocs, collection, addDoc } from 'firebase/firestore';

class UserProfiles{

    constructor(){
        this.db = getFirestore();
    }

    async createProfile(profileName, profileDescription){
        try{
            const profilesCollectionRef = collection(this.db, 'profiles');
            await addDoc(profilesCollectionRef, {
                profileName: profileName,
                profileDescription: profileDescription,
                userIDs: [],
                status: "Active"
            })
            return true
        } catch(error){
            return false
        }
    };

    async getProfiles(){
        const profilesCollection = collection(this.db, 'profiles');
        const profilesSnapshot = await getDocs(profilesCollection);
        const profilesData = profilesSnapshot.docs.map(doc => {
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        return profilesData;
    }

    async updateProfile(profileID, fieldToUpdate){
        const profileDocRef = doc(this.db, 'profiles', profileID);
        await updateDoc(profileDocRef, fieldToUpdate);
    }
}

export const userProfiles = new UserProfiles();