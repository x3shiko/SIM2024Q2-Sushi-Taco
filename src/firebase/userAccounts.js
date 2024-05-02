import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail  } from "firebase/auth";
import { auth } from "./firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

class NewUser{
    doCreateUserWIthEmailAndPassword(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }
}

class UserSignIn{
    doSignInWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
}

class UserSignOut{
    doSignOut = () => {
        return auth.signOut();
    }
}

class UserUpdate{
    doPasswordChange = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword)
    }

    changeEmail = (newEmail) => {
        return updateEmail(user, newEmail)
    }
}

class UserAccounts{

    constructor(){
        this.db = getFirestore();
    }

    doCreateUserWIthEmailAndPassword(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    doSignInWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    doSignOut = () => {
        return auth.signOut();
    }

    doPasswordChange = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword)
    }

    changeEmail = (newEmail) => {
        return updateEmail(user, newEmail)
    }

    getAccounts = async () => {

        const accountsCollection = collection(this.db, 'users');
        const accountsSnapshot = await getDocs(accountsCollection);
        const accountsData = accountsSnapshot.docs.map(doc => {
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        return accountsData;
    }
}

class User{
    //sdnsjdn
}

export const userAccounts = new UserAccounts();
export const userSignOut = new UserSignOut();
export const userSignIn = new UserSignIn();