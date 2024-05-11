import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DashboardBuyer from "./dbbuyer";
import { createReviewController, getAgentUsers, createRatingController } from "../../controller";

const RateReviewAgents = () => {
  const [isOpenBReview, setIsOpenBReview] = useState(false); // state for review modal
  const [rating, setRating] = useState(0); // state for rating
  const [agents, setAgents] = useState([]);
  const [selectedAgentID, setSelectedAgentID] = useState('')
  const [review, setReview] = useState('')
  
  useEffect(() => {
    const fetchAgents = async () => {
      const existingAgents = await getAgentUsers.getAgents()
      setAgents(existingAgents)
    }
    fetchAgents()
  },[])

  const Rating = () => {
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

  // open and close modal for review
  const openModalBReview = (agentID) => {
    setSelectedAgentID(agentID)
    setIsOpenBReview(true);
  }
  const closeModalBReview = () => setIsOpenBReview(false);

  const handleReviewInput = (e) => {
    setReview(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createReviewController.createReview(selectedAgentID, review)
    await createRatingController.createRating(selectedAgentID, rating)
    closeModalBReview()
  }

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
          {agents.map((agent) => (
            <tr>
            <td className="px-6 py-4 whitespace-nowrap">{agent.firstName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{agent.lastName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{agent.email}</td>
            <button
              className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600"
              onClick={() => openModalBReview(agent.id)}
            >
              Rate & Review
            </button>
          </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isOpenBReview}
        onRequestClose={closeModalBReview}
        className="block p-2 w-1/2 mx-auto bg-gray-600"
      >
        <form onSubmit={handleSubmit}>
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
            id="BuyerReview"
            placeholder="Review"
            value = {review}
            onChange={handleReviewInput}
            className="my-2 block w-full px-3 py-2 h-32 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          className="p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
          onClick={closeModalBReview}
        >
          Close
        </button>
        <button
          type="submit"
          className="p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
        >
          Post
        </button>{" "}
        </form>
        {/* add onclick to create into database */}
      </Modal>
    </div>
  );
};

const viewRRBAgent = () => {
  return (
    <div id="viewA" className="flex">
      <DashboardBuyer />
      <RateReviewAgents />
    </div>
  );
};
export default viewRRBAgent;
