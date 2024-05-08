import React from "react";
import DBSeller from "./dbseller";

const SellerHome = () => {
  return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      <h1 className="flex gap-4 justify-center font-mono font-semibold">
        Welcome, <span id="seller">Seller</span> {/* Buyer's name using ID */}
      </h1>
      {/* Buyer's profile add their profile in here */}
      <p className="flex gap-4 justify-center">
        Hi I am a seller interested to sell around Serangoon
      </p>
    </div>
  );
};

const DBSellerHome = () => {
  return (
    <div id="dbhome" className="flex item-start">
      <DBSeller />
      <SellerHome />
    </div>
  );
};

export default DBSellerHome;
