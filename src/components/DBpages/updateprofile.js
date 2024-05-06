import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Dashboard from './dashboard';
import { viewAccountController, updateProfileController } from '../../controller';

const TableP = () => {
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
                                Update
                            </button>
                            <Modal isOpen={isOpen} onRequestClose={closeModal} className="block p-2 w-1/2 mx-auto bg-gray-600">
                            <div className='flex p-3 mb-5 border-b-4 justify-evenly align-middle text-white'>Update</div> {/* header*/}
                                <div className="mt-4 mb-3">
                                <label htmlFor="roles" className="block mb-4 text-sm font-medium text-white">Update Profile for this Account</label>
                                <textarea id="CreateProfile" placeholder='Profile Description' className="my-2 block w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm overflow-hidden whitespace-normal focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                                </div>
                            <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModal}>Close</button>
                            {/* add onclick to Update the database */}
                            <button type='submit' className='p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300'>Update</button>
                        </Modal>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const UpdateP = () => {
  
    return (
      <div id='updateA' className='flex'>
        <Dashboard/>
        <TableP/>
      </div>
    );
  };

export default UpdateP;