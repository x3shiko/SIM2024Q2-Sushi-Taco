//import React,{useState} from 'react';
import DashboardBuyer from './dbbuyer';
import Imagee1 from "../../assets/1.png";

const BuyerSaveProperty = () => {

  return(
    <div className="grid grid-cols-3 p-4 min-h-screen w-3/4 overflow-x-auto">
      <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={Imagee1} alt="img1"/>
          <div className="px-6 py-4">
             <div className="font-bold text-xl mb-2">123 Main St</div>
                <p className="text-gray-700 text-base">
                  House Description: 3 bd | 2 ba | 1,500 sqft
                  Price:              $500,000
                  </p>
            </div>
        </div>
    </div>

  );
};

const viewSaveBP = () => {
  
    return (
      <div id='viewA' className='flex'>
        <DashboardBuyer/>
        <BuyerSaveProperty/>
      </div>
    );
  };
export default viewSaveBP;