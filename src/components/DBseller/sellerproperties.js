import React, { useEffect, useState } from "react";
import DBSeller from "./dbseller";
import Imagee1 from "../../assets/1.png";

const SellerProperties = () => {
  return (
    <div className="min-h-screen w-3/4 overflow-x-auto">
      {/* Start of Property Grid */}
      <div className="grid grid-cols-3 grid-rows-3 my-3">
        {/* show properties listing */}{" "}
        {/* add image/address/description data here */}
        <div className="m-3 max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={Imagee1} alt="Placeholder" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">123 Main St</div>
            <p className="text-gray-700 text-base">3 bd | 2 ba | 1,500 sqft</p>
          </div>
          <div className="px-6 py-4">
            {/* Using buttons for the shape */} {/* add save count data here */}
            <button
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              disabled
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const viewSP = () => {
  return (
    <div id="viewA" className="flex">
      <DBSeller />
      <SellerProperties />
    </div>
  );
};
export default viewSP;
