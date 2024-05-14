import { user } from "./firebase/userAccounts";
import { properties } from "./properties";
import { userProfiles } from "./firebase/userProfile";
import { reviews } from "./firebase/reviews";
import { ratings } from "./firebase/ratings";


class CreateAccountController{

    async createAccount(email, password, firstName, lastName){
        return await user.createNewUser(email, password, firstName, lastName)
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

class SearchUserByEmailController{
    async searchUserByEmail(email){
        return await user.searchUserByEmail(email)
    }
}

export const searchUserByEmailController = new SearchUserByEmailController();

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

class GetSellingPropertiesController{
    async getSellingProperties(){
        return await properties.getSellingProperties()
    }
}

export const getSellingPropertiesController = new GetSellingPropertiesController()

class UpdatePropertiesController{
    async updateProperties(propertyID, fieldToUpdate){
        await properties.updateProperties(propertyID, fieldToUpdate)
    }
}

export const updatePropertiesController = new UpdatePropertiesController()

class DeletePropertyController{
    async deleteProperty(propertyID){
        await properties.deleteProperty(propertyID)
    }
}

export const deletePropertyController = new DeletePropertyController()

class SearchPropertiesByLocationController{
    async searchPropertyByLocation(location){
        return await properties.searchPropertyByLocation(location)
    }
}

export const searchPropertiesByLocationController = new SearchPropertiesByLocationController()

class ViewRatingController{
    async getRatings(){
        return await ratings.getRatings()
    }
}

export const viewRatingController = new ViewRatingController()

class ViewReviewController{
    async getReviews(){
        return await reviews.getReviews()
    }
}

export const viewReviewController = new ViewReviewController()

class ViewSellerController{
    async getSellers(){
        return await user.getSellers()
    }
}

export const viewSellerController = new ViewSellerController()

class CreatePropertyListingController{
    async createProperty(file, sellerID, address, price, description){
        return await properties.createPropertyListing(file, sellerID, address, price, description)
    }
}

export const createPropertyListingController = new CreatePropertyListingController()