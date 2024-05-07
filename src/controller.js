import { userSignOut, userSignIn, newUser, existingUsers, updateUser } from "./firebase/userAccounts";
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

class UpdateAccountController{
    updateAccount(userID, fieldToUpdate){
        return new Promise((resolve, reject) => {
            resolve(updateUser.updateAccount(userID, fieldToUpdate))
        });
    }
}

export const updateAccountController = new UpdateAccountController();

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

class SignInController {
    async signIn(email, password) {
        try {
            const role = await userSignIn.doSignInWithEmailAndPassword(email, password);
            return role;
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    }
}

export const signInController = new SignInController();