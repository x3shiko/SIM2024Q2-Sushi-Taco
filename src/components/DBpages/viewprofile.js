import React,{useRef, useState, useEffect} from 'react';
import Modal from 'react-modal';
import Dashboard from './dashboard';

// Table for Profile add ID into the ()
const ViewProfile = () => {
    const [isOpen, setIsOpen] = useState(false); // state for modal

    const openModal = () => setIsOpen(true); // open modal
    const closeModal = () => setIsOpen(false);


    return (
        <div className="min-h-screen w-3/4 overflow-x-auto">
                {/* Search input */}
                <div className="flex my-2 items-center justify-center">
                    {/* add value query and add onchange */}
                <input
                    type="text"
                    placeholder="Search by email"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Profile Description
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample data */}
                    <tr>
                        <td className="m-2 px-6 py-4 whitespace-nowrap">John</td>
                        <td className="m-2 px-6 py-4 whitespace-nowrap">Johndoe@gmail.com</td>
                        <td className="m-2 px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden">Hi Im John, I specialise in HDB estate</td>
                            <button className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600" onClick={openModal}>
                                View
                            </button>
                            <Modal isOpen={isOpen} onRequestClose={closeModal} className="block p-2 w-1/2 mx-auto bg-gray-600">
                            <div className='flex p-3 mb-5 max-h-full border-b-4 justify-evenly align-middle text-white'>View</div> {/* header*/}
                                <div className="mt-4 mb-3">
                                <h3  className="block mb-4 text-lg font-medium text-white">John Doe</h3>
                                <p className="block p-2 mb-4 bg-white rounded-md text-md font-medium overflow-hidden whitespace-pre-wrap">Hi Im John, I specialise in HDB estate</p>
                                </div>
                            <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModal}>Close</button>
                        </Modal>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const ViewP = () => {
  
    return (
      <div id='viewA' className='flex'>
        <Dashboard/>
        <ViewProfile/>
      </div>
    );
  };

export default ViewP;