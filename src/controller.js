import { user } from "./firebase/userAccounts";
import { properties } from "./properties";


class CreateAccountController{

    createAccount(email, password, firstName, lastName){
        return user.createNewUser(email, password, firstName, lastName)
    }
    
}

export const createAccountController = new CreateAccountController()

class ViewAccountController{
    getAccounts = () =>{
        return new Promise((resolve, reject) => {
            resolve(user.getAccounts())
        });
    }
}

export const viewAccountController = new ViewAccountController();

class UpdateAccountController{
    async updateAccount(userID, fieldToUpdate){
        return await user.updateAccount(userID, fieldToUpdate)
    }
}

export const updateAccountController = new UpdateAccountController();

class UpdatePasswordController{
    async updatePassword(userID, newPassword){
        await user.updatePassword(userID, newPassword);
    }
}

export const updatePasswordController = new UpdatePasswordController();

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
        user.doSignOut();
    }
}

export const signOutController = new SignOutController();

class SignInController {
    async signIn(email, password) {
        try {
            const role = await user.doSignInWithEmailAndPassword(email, password);
            return role;
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    }
}

export const signInController = new SignInController();