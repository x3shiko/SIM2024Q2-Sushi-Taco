import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import DBReal from "./dbrealestate";
import imageProp from "../../assets/1.png";

const ViewRealProperty = () => {
  const [isOpenPEdit, setIsOpenPEdit] = useState(false); // state for review modal
  const [isOpenPRemove, setIsOpenPRemove] = useState(false); // state for review modal

  // open and close modal for edit
  const openModalPEdit = () => setIsOpenPEdit(true);
  const closeModalPEdit = () => setIsOpenPEdit(false);

  // open and close modal for remove
  const openModalPRemove = () => setIsOpenPRemove(true);
  const closeModalPRemove = () => setIsOpenPRemove(false);

  // handle search change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
  };

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
        <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={imageProp} alt="Placeholder" />
          <div className="px-6 py-4">
            {/* If u save property name can add here */}
            <div className="font-bold text-xl mb-2">123 Main St</div>
            {/* If u save property address can add here */}
            <p className="text-gray-700 text-base">3 bd | 2 ba | 1,500 sqft</p>
          </div>
          <div className="px-6 py-4">
            <button
              className="my-1 mx-2 p-2 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium shadow-md hover:border-blue-600 hover:text-blue-600"
              onClick={openModalPEdit}
            >
              Edit
            </button>
            <button
              className="my-1 mx-2 p-2 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium shadow-md hover:border-blue-600 hover:text-blue-600"
              onClick={openModalPRemove}
            >
              Remove
            </button>

            {/* modal for edit */}
            <Modal
              isOpen={isOpenPEdit}
              onRequestClose={closeModalPEdit}
              className="block p-4 w-1/2 mx-auto rounded-md bg-gray-600"
            >
              {/* Add property name in span*/}
              <div className="flex p-3 mb-2 align-middle text-white">
                Do you want to remove this property?
                <span className="ml-2 text-red-500 font-semibold">Main st</span>
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
                onClick={closeModalPEdit}
              >
                No
              </button>
              {/* add onclick to create into database */}
            </Modal>

            {/* modal for Remove */}
            <Modal
              isOpen={isOpenPRemove}
              onRequestClose={closeModalPRemove}
              className="block p-2 w-1/2 mx-auto rounded-md bg-gray-600"
            >
              <div className="flex p-3 mb-3 border-b-4 justify-evenly align-middle text-white">
                Edit
              </div>
              <div className="flex p-3 justify-evenly align-middle text-white">
                Field to update ▽
              </div>
              {/* Add value with pre-existing description into textarea*/}
              <textarea
                className="my-4 block w-full px-3 py-2 h-32 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {/* Button to submit */}
              <button
                type="submit"
                className="p-2 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
              >
                Confirm
              </button>
              <button
                className="p-2 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
                onClick={closeModalPRemove}
              >
                Close
              </button>
            </Modal>
          </div>
        </div>
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
