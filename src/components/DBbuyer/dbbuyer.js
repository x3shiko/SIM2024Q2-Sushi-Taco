import React, { useState } from 'react';

const DashboardBuyer = () => {
    const [showDrop, setShowDrop] = useState(false);
    const handleDropClick = () => {
        setShowDrop(!showDrop);
      };
    return (
        <div id="dashboard" className="flex w-1/4 h-full bg-gray-100">
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
                    <h1 className="text-xl font-bold mb-4"><a href='DBBuyerHome'>Buyer Homepage</a></h1>
                    <ul>
                        <li className="py-2 hover:bg-blue-700 cursor-pointer"><a href='/buyerproperties'>Properties</a></li>
                        {/*<li className="py-2 hover:bg-blue-700 cursor-pointer"><a href='assignrole'>Assign Roles</a></li>*/}
                        <li className="py-2 hover:bg-blue-700 cursor-pointer"><a href='/rrAgents'>Rate/Review Agents</a></li>
                        <li className="py-2 hover:bg-blue-700 cursor-pointer"><a href='/calculateMort'>Calculate Mortgage</a></li>
                        <li className="py-2 hover:bg-blue-700 cursor-pointer"><a href='/buyersaveproperty'>Saved Properties</a></li>
                        <li className="py-2 hover:bg-blue-700 cursor-pointer"><a href='/'>Logout</a></li>
                    </ul>
                </div>
            </div>
            <div
        className={`${
          showDrop ? "flex" : "hidden"
        } md:hidden flex flex-col bg-blue-800 text-white w-1/4 absolute top-6 left-0 z-10`}
      >
      
        <a href="DBBuyerHome"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
          Home
        </a>
        <a href="/buyerproperties"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
           Properties
        </a>
        {/*<a href="AssignR"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
          Assign Roles
      </a>*/}
        <a href="/rrAgents"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
           Rate/Review Agents
        </a>
        <a href="/calculateMort"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
           Calculate Mortgage
        </a>
        <a href="/buyersaveproperty"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
           Saved Properties
        </a>
        <a href="/"
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleDropClick}
        >
           Logout
        </a>
      </div>
        </div>
        
    );
};



export default DashboardBuyer;
