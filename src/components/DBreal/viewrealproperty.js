import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import DBReal from "./dbrealestate";
import imageProp from "../../assets/1.png";
import { viewPropertiesController, updatePropertiesController, deletePropertyController } from "../../controller";

const EditImage = ({ onEditImage }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onEditImage(file);
  };
  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
    </div>
  );
};

const ViewRealProperty = () => {
  const [isOpenPEdit, setIsOpenPEdit] = useState(false); // state for review modal
  const [isOpenPRemove, setIsOpenPRemove] = useState(false); // state for review modal
  const [realAddress, setRealAddress] = useState(false); // hide for edit address
  const [realDescription, setRealDescription] = useState(false); // hide for edit description
  const [realImage, setRealImage] = useState(false); // hide for edit image
  const [realSold, setRealSold] = useState(false); // hide for sold/unsold
  const [realPrice, setRealPrice] = useState(false); // hide for Price
  const [realEdit, setRealEdit] = useState(""); // state for edit
  const [updateEdit, setUpdateEdit] = useState("");
  const [editImage, setEditImage] = useState(null); // state for uploaded image
  const [editSold, setEditSold] = useState(""); // state for suspend/unsuspend
  const [updatingPropertyID, setUpdatingPropertyID] = useState("")
  const [removePropertyID, setRemovePropertyID] = useState("")

  const [properties, setProperties] = useState([]);
  const fetchProperties = async () => {
    const properties = await viewPropertiesController.fetchProperties();
    setProperties(properties);
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  //toggle to show options to edit
  const toggleEditAddress = () => {
    setRealAddress(!realAddress);
  };
  const toggleEditDescription = () => {
    setRealDescription(!realDescription);
  };
  const toggleEditImage = () => {
    setRealImage(!realImage);
  };
  const toggleEditSold = () => {
    setRealSold(!realSold);
  };
  const toggleEditPrice = () => {
    setRealPrice(!realPrice);
  };

  // open and close modal for edit
  const openModalPEdit = (propertyID) => {
    setUpdatingPropertyID(propertyID)
    setIsOpenPEdit(true);
  }
  const closeModalPEdit = () => setIsOpenPEdit(false);

  // open and close modal for remove
  const openModalPRemove = (propertyID) => {
    setRemovePropertyID(propertyID)
    console.log(`remove this property ID: ${propertyID}`)
    setIsOpenPRemove(true);
  }
  const closeModalPRemove = () => setIsOpenPRemove(false);

  // handle search change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
  };

  const handleUpdateEdit = (e) => {
    setUpdateEdit(e.target.value);
  };

  const handleEditSold = (e) => {
    setEditSold(e.target.value);
    console.log(editSold);
  };

  // handle edit option
  const handleRealEdit = (e) => {
    const value = e.target.value;
    console.log(value);
    setRealEdit(value);
    setRealAddress(value === "address");
    setRealDescription(value === "description");
    setRealImage(value === "image");
    setRealSold(value === "sold");
    setRealPrice(value === "price");
  };

  const handleImageEdit = (image) => {
    setEditImage(image);
    console.log("Image uploaded", image);
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    try {
      if (realEdit === "address") {
        // Update user email
        await updatePropertiesController.updateProperties(updatingPropertyID, {
          address: updateEdit,
        });
      } else if (realEdit === "description") {
        // Update user password
        await updatePropertiesController.updateProperties(updatingPropertyID, {
          description: updateEdit,
        });
      } else if (realEdit === "image") {
        await updatePropertiesController.updateProperties(updatingPropertyID, {
          image: editImage,
        });
      } else if (realEdit === "sold"){
        await updatePropertiesController.updateProperties(updatingPropertyID, {
          status: editSold,
        });
      } else if (realEdit === "price"){
        await updatePropertiesController.updateProperties(updatingPropertyID, {
          price: updateEdit,
        });
      } else {
        console.log("No valid update operation selected.");
      }
      fetchProperties();
      closeModalPEdit();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDeleteProperty = async () => {
    await deletePropertyController.deleteProperty(removePropertyID)
  }

  return (
    <div className="min-h-screen w-3/4 overflow-x-auto">
      {/* Search input add value and */}
      <div className="flex mt-2 items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 my-3">
        {properties.map((property) => (
          <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={property.image} alt="Placeholder" />
          <div className="px-6 py-4">
            {/* If u save property name can add here */}
            <div className="font-bold text-xl mb-2">{property.address}</div>
            <p className="text-green-500 text-base">{"$" + property.price}</p>
            {/* If u save property price can add here */}
            {/* If u save property address can add here */}
            <p className="text-gray-700 text-base">{property.description}</p>
            <p className="text-blue-700 text-base">
              UserID:{" "}
              <span className="font-semibold">{property.ownByUserID}</span>
            </p>
          </div>
          <div className="px-6 py-2">
            <button
              className="my-1 mx-2 p-2 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium shadow-md hover:border-blue-600 hover:text-blue-600"
              onClick={() => openModalPEdit(property.id)}
            >
              Edit
            </button>
            <button
              className="my-1 mx-2 p-2 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium shadow-md hover:border-blue-600 hover:text-blue-600"
              onClick={() => openModalPRemove(property.id)}
            >
              Remove
            </button>
          </div>
          </div>
        ))}
            {/* modal for Remove */}
            <Modal
              isOpen={isOpenPRemove}
              onRequestClose={closeModalPRemove}
              className="block p-4 w-1/2 mx-auto rounded-md bg-gray-600"
            >
              <form onSubmit={handleDeleteProperty}>
              <div className="flex p-3 mb-2 align-middle text-white">
                Do you want to remove this property?
              </div>
              {/* Button to submit */}
              <button
                type="submit"
                className="p-2 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
              >
                Yes
              </button>
              <button
                className="p-2 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
                onClick={closeModalPRemove}
              >
                No
              </button>
              </form>
            </Modal>

            {/* modal for Edit */}
            <Modal
              isOpen={isOpenPEdit}
              onRequestClose={closeModalPEdit}
              className="block p-2 w-1/2 mx-auto rounded-md bg-gray-600"
            >
              <form onSubmit={handleUpdateProperty}>
              <div className="flex p-3 mb-3 border-b-4 justify-evenly align-middle text-white">
                Edit
              </div>
              <div className="mt-4 mb-3">
                <label
                  htmlFor="roles"
                  className="block mb-4 text-sm font-medium text-white"
                >
                  Select Changes
                </label>
                <select
                  id="roles"
                  value={realEdit}
                  onChange={handleRealEdit}
                  className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Edit
                  </option>
                  <option value="address" onClick={toggleEditAddress}>
                    Address
                  </option>
                  <option value="description" onClick={toggleEditDescription}>
                    Property Description
                  </option>
                  <option value="image" onClick={toggleEditImage}>
                    Image
                  </option>
                  <option value="sold" onClick={toggleEditSold}>
                    Sold/Unsold
                  </option>
                  <option value="price" onClick={toggleEditPrice}>
                    Price
                  </option>
                </select>
              </div>
              {/* Edit address */}
              {realAddress && (
                <div className="mt-4 mb-3 border-b-2">
                  <textarea
                    id="Address"
                    placeholder="Update Address"
                    onChange={handleUpdateEdit}
                    className="my-2 h-20 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              )}
              {/* Edit description */}
              {realDescription && (
                <div className="mt-4 mb-3 border-b-2">
                  <textarea
                    id="Description"
                    placeholder="Update Property Description"
                    onChange={handleUpdateEdit}
                    className="my-2 h-20 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              )}
              {/* Edit image */}
              {realImage && (
                <div className="mt-4 mb-3 border-b-2">
                  <h1 className="pt-2.5 text-sm font-medium text-gray-400">
                    Edit Photo
                  </h1>
                  <div className="mt-1 my-2 flex w-full px-3 py-2 bg-white border border-gray-300 justify-evenly text-center rounded-md shadow-sm">
                    {/* to store photo */}
                    <EditImage onImageUpload={handleImageEdit} />
                    {editImage && (
                      <div className="mt-4">
                        <h2 className="text-lg font-semibold">
                          Uploaded Image:
                        </h2>
                        <img
                          src={URL.createObjectURL(editImage)}
                          alt="Uploaded"
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Edit sold/unsold */}
              {realSold && (
                <div className="mt-4 mb-3 border-b-2">
                  <label
                    htmlFor="roles"
                    className="block mb-4 text-sm font-medium text-white"
                  >
                    Edit Sold/Unsold
                  </label>
                  <select
                    id="roles"
                    value={editSold}
                    onChange={handleEditSold}
                    className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Sold/Unsold
                    </option>
                    <option value="sold">Sold</option>
                    <option value="unsold">Unsold</option>
                  </select>
                </div>
              )}
              {/* Edit price */}
              {realPrice && (
                <div className="mt-4 mb-3 border-b-2">
                  <input
                    id="Price"
                    type="number"
                    placeholder="Edit Price in $"
                    onChange={handleUpdateEdit}
                    className="my-2 h-auto block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              )}
              {/* Button to submit */}
              <button
                type="submit"
                className="p-2 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
              >
                Confirm
              </button>
              <button
                className="p-2 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
                onClick={closeModalPEdit}
              >
                Close
              </button>
              </form>
            </Modal>
          </div>
        </div>
  );
};

const ViewRP = () => {
  return (
    <div id="dbhome" className="flex item-start">
      <DBReal />
      <ViewRealProperty />
    </div>
  );
};
export default ViewRP;
