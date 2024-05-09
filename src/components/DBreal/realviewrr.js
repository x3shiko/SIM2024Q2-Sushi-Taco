import React, { useState } from "react";
import DBReal from "./dbrealestate";

const Star = ({ filled }) => {
  return (
    <span
      className={`text-2xl ${filled ? "text-yellow-500" : "text-gray-300"}`}
    >
      ★
    </span>
  );
};

const Realrr = () => {
  // delete const rating = 5; once you add your backend its just meant to demo
  const rating = 5;

  return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      <div className="container w-full border border-black rounded-md shadow-md bg-indigo-300">
        <h1 className="pt-4 pl-8 text-md text-gray-100">
          Name: <span id="reviwer">Grey</span>
        </h1>
        <div className="flex pl-8">
          <span className="text-gray-100 pt-1">Rating: </span>
          {/* Replace rating with ur backend data name */}
          {[...Array(rating)].map((_, index) => (
            <Star key={index} filled={true} />
          ))}
        </div>
        <div className="flex justify-center p-2">
          <p className="p-2 w-3/4 bg-white border border-black rounded-sm shadow-md">
            Brian Low is a fantastic real estate agent Brian Low is a fantastic
            real estate agent Brian Low is a fantastic real estate agent
          </p>
        </div>
      </div>
    </div>
  );
};

const RealViewRR = () => {
  return (
    <div id="dbhome" className="flex item-start">
      <DBReal />
      <Realrr />
    </div>
  );
};
export default RealViewRR;
