// ProfileDashboard.js
import React, { useState } from "react";
import { signOutController } from "../../controller";

// change both data to profile.status or whatever u called it for Suspend and Active
const DBReal = ({ data }) => {
  const [showDrop, setShowDrop] = useState(false);

  const status = data;
  //testing
  //const status = "Suspend";

  const handleDropClick = () => {
    setShowDrop(!showDrop);
  };

  const handleLogOut = () => {
    signOutController.signOut();
    handleDropClick();
  };

  return (
    <div id="dashboard" className="flex w-1/4 bg-gray-100">
      <div className="md:hidden transition-all" onClick={handleDropClick}>
        {showDrop ? (
          <svg
            className="h-6 w-6 text-black cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.95 5.879l-1.414-1.414L10 8.586 6.464 5.05 5.05 6.464 8.586 10l-3.536 3.536 1.414 1.414L10 11.414l3.536 3.536 1.414-1.414L11.414 10l3.536-3.536z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-black cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="hidden md:flex bg-blue-800 w-full h-screen">
        <div className="p-4 text-white">
          <h1 className="text-xl font-bold mb-4">
            <a href="dbrealhome">Real-Estate Homepage</a>
          </h1>
          <ul>
            <li
              className={`py-2 ${
                status === "Suspend"
                  ? "opacity-50 cursor-not-allowed disabled"
                  : "hover:bg-blue-700 cursor-pointer"
              }`}
            >
              <a href={status === "Suspend" ? "#" : "propertylisting"}>
                Create Property Listing
              </a>
            </li>
            <li
              className={`py-2 ${
                status === "Suspend"
                  ? "opacity-50 cursor-not-allowed disabled"
                  : "hover:bg-blue-700 cursor-pointer"
              }`}
            >
              <a href={status === "Suspend" ? "#" : "viewrealproperty"}>
                View Properties
              </a>
            </li>
            <li
              className={`py-2 ${
                status === "Suspend"
                  ? "opacity-50 cursor-not-allowed disabled"
                  : "hover:bg-blue-700 cursor-pointer"
              }`}
            >
              <a href={status === "Suspend" ? "#" : "realviewrr"}>
                View Review & Rating
              </a>
            </li>
            <li className="py-2 hover:bg-blue-700 cursor-pointer">
              <a href="/">Logout</a>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </div>
      <div
        className={`${
          showDrop ? "flex" : "hidden"
        } md:hidden flex flex-col bg-blue-800 text-white w-1/4 absolute top-6 left-0 z-10`}
      >
        <a
          href="dbrealhome"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
          Homepage
        </a>
        <a
          href={status === "Suspend" ? "#" : "propertylisting"}
          className={`py-4 ${
            status === "Suspend"
              ? "opacity-50 cursor-not-allowed disabled"
              : "hover:bg-gray-700 cursor-pointer"
          }`}
          onClick={handleDropClick}
        >
          Create Property Listing
        </a>
        <a
          href={status === "Suspend" ? "#" : "viewrealproperty"}
          className={`py-4 ${
            status === "Suspend"
              ? "opacity-50 cursor-not-allowed disabled"
              : "hover:bg-gray-700 cursor-pointer"
          }`}
          onClick={handleDropClick}
        >
          View Properties
        </a>
        <a
          href={status === "Suspend" ? "#" : "realviewrr"}
          className={`py-4 ${
            status === "Suspend"
              ? "opacity-50 cursor-not-allowed disabled"
              : "hover:bg-gray-700 cursor-pointer"
          }`}
          onClick={handleDropClick}
        >
          View Review & Rating
        </a>
        <a
          href="/"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleLogOut}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default DBReal;
