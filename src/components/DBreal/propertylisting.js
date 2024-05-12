import React, { useState } from "react";
import Modal from "react-modal";
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

// Change image to uploaded image
const UploadImage = ({ onUploadImage }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onUploadImage(file);
  };
  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
    </div>
  );
};

const CreateListing = () => {
  //alert function
  const [showAlert, setShowAlert] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // state for uploaded image
  const [isOpenAccount, setIsOpenAccount] = useState(false); // false state for Selecting account

  // open modal to select account
  const openModalAccount = () => setIsOpenAccount(true);
  const closeModalAccount = () => setIsOpenAccount(false);

  //handle image upload
  const handleImageUpload = (image) => {
    setUploadedImage(image);
    console.log("Image uploaded", image);
  };

  // handle alert when created
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the image preview to the result of reading the file
        setImagePreview(reader.result);
      };
      // Read the file as a data URL (base64 encoded)
      reader.readAsDataURL(file);
    }
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
              <h1 className="pt-2.5 text-sm font-medium text-gray-400">
                Upload Photo
              </h1>
              <div className="mt-1 flex w-full px-3 py-2 bg-white border border-gray-300 justify-evenly text-center rounded-md shadow-sm">
                {/* to store photo */}
                <UploadImage onImageUpload={handleImageUpload} />
                {uploadedImage && (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">Uploaded Image:</h2>
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Uploaded"
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Show account */}
            <div className="my-4">
              <div className="p-1 flex justify-evenly">
                <button
                  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  onClick={openModalAccount}
                >
                  Select Account
                </button>
                {/* Show account add account choosen inside as {Data} instead of selleraccount */}
                <div className="p-2 flex justify-center bg-white border rounded-md">
                  <p className="mt-2 text-2x1 font-medium">
                    selleraccount@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="my-4">
              <input
                type="address"
                id="address"
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          <Modal
            isOpen={isOpenAccount}
            onRequestClose={closeModalAccount}
            className="block p-2 w-3/4 mx-auto bg-gray-600"
          >
            <div className="flex p-3 mb-2 border-b-4 justify-evenly align-middle text-white">
              Select Account
            </div>
            {/* header*/}
            <table className="mb-5 min-w-full h-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Select
                  </th>
                </tr>
              </thead>
              {/* Profile Data to select which profile to reassign */}
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Seller</td>
                  <td className="px-6 py-4 whitespace-nowrap">Account</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    selleraccount@gmail.com
                  </td>
                  {/* Add onchange and checked  */}
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="ml-9 mt-4 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </tr>
              </tbody>
            </table>
            <button
              className="p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
              onClick={closeModalAccount}
            >
              Close
            </button>
            {/* Add onclick handle  */}
            <button className="p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300">
              Select
            </button>
          </Modal>
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
