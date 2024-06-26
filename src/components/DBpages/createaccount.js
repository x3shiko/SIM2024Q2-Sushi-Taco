import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import SnTLogo from "../../assets/SnTLogo.png";
import { createAccountController } from "../../controller";

const Alert = ({ type, message }) => {
  // add or remove visibility of alert
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [type, message]);

  if (!isVisible) return null;
  // Alert function
  let alertClasses = "my-2 px-4 py-2 rounded-md";
  switch (type) {
    case "success":
      alertClasses += " bg-green-500 text-white";
      break;
    case "error":
      alertClasses += " bg-red-500 text-white";
      break;
    default:
      alertClasses += " bg-gray-500 text-white";
  }

  return (
    <div className={alertClasses}>
      <p>{message}</p>
    </div>
  );
};

const Signup = () => {
  //alert function
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleShowErrorAlert = () => {
    setShowErrorAlert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sign up logic here
    const signupForm = document.querySelector("#signup-form");
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;
    const firstName = signupForm["firstN"].value;
    const lastName = signupForm["lastN"].value;

    const isSuccessful = await createAccountController.createAccount(
      email,
      password,
      firstName,
      lastName
    );
    if (isSuccessful) {
      signupForm.reset();
      handleShowAlert();
    } else {
      handleShowErrorAlert();
    }
  };
  return (
    <div className="min-h-screen w-3/4 flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <img
            className="h-12 w-auto mx-auto mt-2 block"
            src={SnTLogo}
            alt="Logo"
          />
          <h3 className="my-2 text-center">Let's create account</h3>
          <form onSubmit={handleSubmit} id="signup-form">
            <div className="my-4">
              <label
                htmlFor="firstN"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="text"
                id="firstN"
                placeholder="First Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="lastN"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="text"
                id="lastN"
                placeholder="Last Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                pattern=".{6,}"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            {/* button should be onSubmit but i'll leave it as onClick for you to see first */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Create
            </button>
            {showAlert && (
              <Alert
                type="success"
                message="Account have been created successfully"
              />
            )}
            {showErrorAlert && (
              <Alert type="error" message="Existing email have been used" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
const CreateA = () => {
  return (
    <div id="createA" className="flex">
      <Dashboard />
      <Signup />
    </div>
  );
};

export default CreateA;
