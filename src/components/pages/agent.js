import React from 'react';

import Imagee from "../../assets/Derrick.jpeg";
import Imageee from "../../assets/Jamie.jpeg";
import Imageeee from "../../assets/Brian.jpeg";
const Agents = () => {
  return (
    <div id="agent" className="w-full min-h-screen p-2 flex items-center bg-gradient-to-b from-white to-gray-400">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">Our  <span className="text-blue-600">Agents</span></h2>
    <p className="text-lg text-gray-700 mb-8">
        Featured Property Agents:
      </p>


        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 mb-8">
          
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <img className="w-full h-48 object-cover object-center" src={Imagee} alt="Service 1" />
                <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Derrick Tan</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">Featured Landed Agents</p>
                  <button className="mt-6 px-4 py-2 h-auto bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View Profile
                </button>
                </div>
              </div>
            </div>

          
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <img className="w-full h-48 object-cover object-center" src={Imageee} alt="Service 2" />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Jamie Lee</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">Featured HDB <br></br>Agents</p>
                  <button className="mt-6 px-4 py-2 h-auto bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View Profile
                </button>
                </div>
              </div>
            </div>

           
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <img className="w-full h-48 object-cover object-center" src={Imageeee} alt="Service 3" />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Brian Low</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">Featured Condo Agents</p>
                  <button className="mt-6 px-4 py-2 h-auto bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View Profile
                </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Agents;





















