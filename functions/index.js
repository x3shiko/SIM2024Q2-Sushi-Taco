/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
// const admin = require("firebase-admin");
// admin.initializeApp();

const {initializeApp} = require("firebase-admin/app");
const app = initializeApp();
const {getAuth} = require("firebase-admin/auth");
const admin = getAuth(app);

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.getUserByEmail(data.email).then(user => {
    return admin.setCustomerUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin`
    }
  }).catch(err => {
    return err
  })
})

exports.changeUserPassword = functions.https.onCall(async (data, context) => {
    try {
        await admin.updateUser(data.userId, { password: data.newPassword });
        console.log("Password updated successfully!");
    } catch (error) {
        console.error("Error updating password:", error);
    }
})
