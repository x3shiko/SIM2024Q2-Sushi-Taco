import { user } from "./firebase/userAccounts";
import { properties } from "./properties";
import { userProfiles } from "./firebase/userProfile";
import { reviews } from "./firebase/reviews";
import { ratings } from "./firebase/ratings";


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

class CreateProfileController {
    async createProfile(profileName, profileDescription){
        return await userProfiles.createProfile(profileName, profileDescription)
    }
}

export const createProfileController = new CreateProfileController()

class ViewProfilesController {
    async viewProfiles(){
        return userProfiles.getProfiles()
    }
}

export const viewProfilesController = new ViewProfilesController()

class UpdateProfileController{
    async updateProfile(profileID, fieldToUpdate){
        await userProfiles.updateProfile(profileID, fieldToUpdate)
    }
}

export const updateProfileController = new UpdateProfileController()

class AddUserIDsToProfileController{
    async addUserIDsProfile(profileID, userID){
        await userProfiles.addUserIDsProfile(profileID, userID)
    }
}

export const addUserIDsToProfileController = new AddUserIDsToProfileController()

class SavePropertyToUserController{
    async saveProperty(userID, propertyID){
        await user.saveProperty(userID, propertyID)
    }
}

export const savePropertyToUserController = new SavePropertyToUserController()

class GetSavedPropertiesController{
    async getSavedProperties(){
        return await properties.getSavedProperties()
    }
}

export const getSavedPropertiesController = new GetSavedPropertiesController()

class CreateReviewController{
    async createReview(agentID, review){
        await reviews.createReview(agentID, review)
    }
}

export const createReviewController = new CreateReviewController()

class GetAgentUsers{
    async getAgents(){
        return await user.getAgents()
    }
}

export const getAgentUsers = new GetAgentUsers()

class CreateRatingController{
    async createRating(agentID, rating){
        await ratings.createRating(agentID, rating)
    }
}

export const createRatingController = new CreateRatingController()
