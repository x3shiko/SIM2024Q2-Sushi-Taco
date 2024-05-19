import { user } from "../firebase/userAccounts";
import { currentUser } from "../firebase/firebase";

//seller is able to sign in and sign out
test("user successfully signed in and signed out", async () => {
  //one of the seller account stored inside firebase database
  const userUID = "hz6ytGWSqaedRH6ZB0hdVHqYJvJ3"
  const email = "sellerexample@gmail.com";
  const password = "123123";

  //calling my entity's function sign in
  const userData = await user.doSignInWithEmailAndPassword(email, password);

  //checking if the data return is the same email and password as signed in
  expect(userData.email).toBe(email);
  expect(userData.password).toBe(password);

  //checking if my currentUser signed in (imported from firebase) have the same id as the database
  expect(currentUser.uid).toBe(userUID)

  //calling my entity's function sign out
  await user.doSignOut()

  expect(currentUser).toBe(null)

});

//seller is un-able to sign in
test("user unsuccessfully signed in", async () => {
  //wrong email/password
  const email = "sellerexample@gmail.com";
  const password = "1231234";
  //calling my entity's function sign in
  //checking if my userData is an error
  await expect(user.doSignInWithEmailAndPassword(email, password)).rejects.toThrow("Firebase: Error (auth/invalid-credential).");
});
