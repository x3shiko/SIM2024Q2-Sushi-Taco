import React from "react";
import Image from "../../assets/4.png";

const Sells = () => {
  return (
    <div id="sell" className="flex flex-col md:flex-row w-full h-screen bg-gradient-to-b from-gray-100  to-gray-400">

      <div className="w-full md:w-1/2 p-0 md:p-8 flex items-center justify-center ">
       
        
          <img
            src={Image}
            alt="Sell"
            className="w-full h-auto object-cover rounded-tr-full rounded-bl-ful"
          />
        </div>
  


      <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center bg-gradient-to-b from-gray-100  to-gray-400">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">
          Sell your property confidently
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
          Discover your home's market value using our property valuation tool
            <br/>
          Generate an instant valuation report to compare sale trends in your area powered by our proprietary algorithms.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Sells;
































