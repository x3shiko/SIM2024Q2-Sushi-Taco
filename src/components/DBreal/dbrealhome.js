import React from "react";
import DBReal from "./dbrealestate";

const RealHome = () => {
  return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      <h1 className="flex gap-4 justify-center font-mono font-semibold">
        Welcome, <span id="real">Real-Estate</span>{" "}
        {/* Real-estate's name using ID */}
      </h1>
      {/* Real-estate's profile add their profile in here */}
      <p className="flex gap-4 justify-center">
        Hi I am a Real-Estate agent specialist around Serangoon
      </p>
    </div>
  );
};

const DBRealHome = () => {
  return (
    <div id="dbhome" className="flex item-start">
      <DBReal />
      <RealHome />
    </div>
  );
};

export default DBRealHome;
