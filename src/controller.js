import { userSignOut, userSignIn, newUser, existingUsers } from "./firebase/userAccounts";
import { userProfiles } from './firebase/userProfile';
import { properties } from "./properties";


class CreateAccountController{

    createAccount(email, password, firstName, lastName, roles){
        return newUser.createNewUser(email, password, firstName, lastName, roles)
    }
    
}

export const createAccountController = new CreateAccountController()

class ViewAccountController{
    getAccounts = () =>{
        return new Promise((resolve, reject) => {
            resolve(existingUsers.getAccounts())
        });
    }
}

export const viewAccountController = new ViewAccountController();

class UpdateProfileController{
    updateProfile(userID, fieldToUpdate){
        return new Promise((resolve, reject) => {
            resolve(userProfiles.updateProfile(userID, fieldToUpdate))
        });
    }
}

export const updateProfileController = new UpdateProfileController();

class ViewPropertiesController{
    fetchProperties = () =>{
        return new Promise((resolve, reject) => {
            resolve(properties.getProperties())
        });
    }
}

export const viewPropertiesController = new ViewPropertiesController()

class ViewSoldPropertiesController{
    fetchProperties = () =>{
        return new Promise((resolve, reject) => {
            resolve(properties.getSoldProperties())
        });
    }
}

export const viewSoldPropertiesController = new ViewSoldPropertiesController()

class SignOutController{
    signOut(){
        userSignOut.doSignOut();
    }
}

export const signOutController = new SignOutController();

class SignInController{
    signIn(email,password){
        return new Promise((resolve, reject) => {
            userSignIn.doSignInWithEmailAndPassword(email,password).then(() => {
                resolve(true)
            }).catch((error) => {
                reject(false)
            })
        });
    }
}

export const signInController = new SignInController();