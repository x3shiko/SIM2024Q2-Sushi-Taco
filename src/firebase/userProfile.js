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

// class ProfileUpdate{
//     updateProfile = async (userID, fieldToUpdate) => {
//         const userDocRef = doc(this.db, 'users', userID);
//         await updateDoc(userDocRef, fieldToUpdate);
//     };
// }

class UserProfiles{

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

    updateProfile = async (userID, fieldToUpdate) => {
        const userDocRef = doc(this.db, 'users', userID);
        await updateDoc(userDocRef, fieldToUpdate);
    };

    getSavedProperties = async (userID) => {
        const userDocRef = doc(this.db, 'users', userID);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            
            // Check if the savedProperties field exists
            if (userData.savedProperties && userData.savedProperties.length > 0) {
                // Retrieve each property document using the IDs in savedProperties array
                const propertiesCollection = collection(this.db, 'properties');
                const savedPropertiesDocs = await Promise.all(userData.savedProperties.map(async (propertyId) => {
                    const propertyDocRef = doc(propertiesCollection, propertyId);
                    const propertyDocSnapshot = await getDoc(propertyDocRef);
                    
                    // Check if the property document exists
                    if (propertyDocSnapshot.exists()) {
                        return {
                            id: propertyDocSnapshot.id,
                            ...propertyDocSnapshot.data()
                        };
                    } else {
                        // Handle case where property document does not exist
                        console.error(`Property with ID ${propertyId} not found.`);
                        return null;
                    }
                }));
                
                // Filter out any null values (properties not found)
                const savedProperties = savedPropertiesDocs.filter(property => property !== null);
                
                return savedProperties;
            } else {
                // Handle case where savedProperties array is empty or undefined
                console.log('No properties saved.');
                return [];
            }
        } else {
            // Handle case where user document does not exist
            console.error('User document not found.');
            return null;
        }
    } 
}

export const userProfiles = new UserProfiles();