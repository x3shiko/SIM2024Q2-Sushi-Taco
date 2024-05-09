import React, { useState } from "react";
import DBReal from "./dbrealestate";
import SnTLogo from "../../assets/SnTLogo.png";

const Alert = ({ type, message }) => {
  // Alert function
  let alertClasses = "my-2 px-4 py-2 rounded-md";
  switch (type) {
    case "created":
      alertClasses += " bg-green-500 text-white";
      break;
    case "failed":
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

const CreateListing = () => {
  //alert function
  const [showAlert, setShowAlert] = useState(false);

  // handle alert when created
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen w-3/4 flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Property Listing
          </h2>
          <img
            className="h-12 w-auto mx-auto mt-2 block"
            src={SnTLogo}
            alt="Logo"
          />
          <form onSubmit={handleSubmit} id="signup-form">
            <div className="my-4">
              <div className="mt-1 flex w-full px-3 py-2 bg-white border border-gray-300 justify-evenly text-center rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex pt-2.5 text-sm font-medium text-gray-700">
                  Add Photo
                </span>
                {/* to store photo */}
                <button
                  className="flex items-center justify-center w-32 h-10 border border-indigo-500 rounded-lg shadow-md cursor-pointer hover:border-indigo-300 hover:text-indigo-500"
                  type="file"
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="my-4">
              <input
                type="address"
                id="address"
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="my-4">
              <div className="flex justify-evenly">
                <span className="flex mt-1  px-3 py-2 text-sm font-medium border rounded-md bg-white text-gray-700">
                  $
                </span>
                <input
                  type="number"
                  id="price"
                  placeholder="Price"
                  className="mt-1 flex w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <textarea
                id="propertyDescription"
                placeholder="Description"
                className="my-2 block w-full px-3 py-2 h-32 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                type="created"
                message="Property have been successfully listed!"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
const Listing = () => {
  return (
    <div id="createA" className="flex">
      <DBReal />
      <CreateListing />
    </div>
  );
};

export default Listing;
