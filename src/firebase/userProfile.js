import { getFirestore, doc, updateDoc, setDoc, getDoc, collection } from 'firebase/firestore';

class NewProfile{

    constructor(){
        this.db = getFirestore();
    }

    createProfile = async (userID, email, firstName, lastName, roles) => {
        const userDocRef = doc(this.db, 'users', userID); // 'users' is the collection name
        setDoc(userDocRef, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: roles,
            status: "Active"
            // Add other details as needed
        }).then(() => {
            console.log("User data successfully created and stored in database");
        }).catch((error) => {
            console.error("Error storing user data:", error);
        });
    };
}

class UserProfiles{

    constructor(){
        this.db = getFirestore();
    }

    
}

export const userProfiles = new UserProfiles();