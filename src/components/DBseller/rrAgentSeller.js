import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import DBSeller from "./dbseller";

const Rating = () => {
  const [rating, setRating] = useState(0); // state for rating

  // handle rating onclick
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          className={`${
            value <= rating ? "text-yellow-300" : "text-gray-300"
          } focus:outline-none text-2xl`}
          onClick={() => handleClick(value)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const SellerAgent = () => {
  const [isOpenSReview, setIsOpenSReview] = useState(false); // state for review modal

  // open and close modal for review
  const openModalSReview = () => setIsOpenSReview(true);
  const closeModalSReview = () => setIsOpenSReview(false);

  return (
    <div className="min-h-screen w-3/4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
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
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Rate & Review</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* View Agent add key and mapping here */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Brian</td>
            <td className="px-6 py-4 whitespace-nowrap">Low</td>
            <td className="px-6 py-4 whitespace-nowrap">
              realestatebrian@gmail.com
            </td>
            <button
              className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600"
              onClick={openModalSReview}
            >
              Rate & Review
            </button>
          </tr>
        </tbody>
      </table>
      <Modal
        isOpen={isOpenSReview}
        onRequestClose={closeModalSReview}
        className="block p-2 w-1/2 mx-auto bg-gray-600"
      >
        {/* header for modal*/}
        <div className="flex p-3 mb-5 border-b-4 justify-evenly align-middle text-white">
          Rate & Review
        </div>
        <div className="mt-4 mb-3">
          <h1 id="Rate" className="text-2x1 text-white font-bold mt-2">
            Rating
          </h1>
          <Rating />
          <div className="my-3"></div>
          <textarea
            id="SellerReview"
            placeholder="Review"
            className="my-2 block w-full px-3 py-2 h-32 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          className="p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
          onClick={closeModalSReview}
        >
          Close
        </button>
        <button
          type="submit"
          className="p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
        >
          Post
        </button>{" "}
        {/* add onclick to create into database */}
      </Modal>
    </div>
  );
};

const rrAgentSeller = () => {
  return (
    <div id="viewA" className="flex">
      <DBSeller />
      <SellerAgent />
    </div>
  );
};
export default rrAgentSeller;
