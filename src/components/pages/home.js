import React from "react";
import Image from "../../assets/main.png";

const HomePage = () => {
  return (
    <div id="home" className="w-full min-h-screen p-8 flex items-center bg-gradient-to-b from-white to-gray-400">
      <div className="max-w-7xl mx-auto md:flex md:flex-row-reverse md:items-center">
        <div className="md:w-1/2 md:pr-8 my-11">
        <img
        src={Image}
        alt="Home"
        className="w-full h-auto object-cover rounded-tr-full rounded-bl-full"
        />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Find Your <span className="text-blue-500">Dream Home</span></h1>
            <p className="text-lg text-gray-700 mb-8">
            Explore our widerange of listings and connect with expert agents ready to assist you.
            </p>
           
          <div className="text-center md:text-left">
          
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 mr-5">
              Find a home
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 ml-5">
              Sell your properties
            </button>
          </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;























