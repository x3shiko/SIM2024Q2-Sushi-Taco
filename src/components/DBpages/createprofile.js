import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Dashboard from './dashboard';

const SignProfile = () => {
    const [isOpen, setIsOpen] = useState(false); // state for modal
    const [selectEmail, setSelectEmail] = useState(''); // state for selected email

    const openModal = () => setIsOpen(true); // open modal
    const closeModal = () => setIsOpen(false);

    //
    const handleSelectEmail = (e) => {
        const value = e.target.value.toLowerCase();
        setSelectEmail(value);
    };

    return (
        <div className="min-h-screen w-3/4 overflow-x-auto">
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
                    <tr>
                        {/* the 3 tables are meant to display what have account have been created */}
                        <td className="m-2 px-6 py-4 whitespace-nowrap">John</td>
                        <td className="m-2 px-6 py-4 whitespace-nowrap">Johndoe@gmail.com</td>
                        <td className="m-2 px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden">Hi Im John, I specialise in HDB estate</td>
                        <div className="flex my-2 items-center justify-center">
                            {/* Create button */}
                        <button className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100" onClick={openModal}>
                            Create Profile
                        </button>
                        </div>
                            <Modal isOpen={isOpen} onRequestClose={closeModal} className="block p-2 w-1/2 mx-auto bg-gray-600">
                                {/* header for modal*/}
                            <div className='flex p-3 mb-5 border-b-4 justify-evenly align-middle text-white'>Select Changes</div>
                                <div className="mt-4 mb-3">
                                <label htmlFor="roles" className="block mb-4 text-sm font-medium text-white">Create Profile for this Account</label>
                            <div className='my-3'>
                                {/* Search input add value and onchange*/}
                                <input type="text" placeholder="Search Email" className="w-full p-2 border border-gray-300 rounded focus:outline-none"/>
                                    {selectEmail && (
                                        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                            {/* add key and >{data}<*/}
                                            <li className="p-2 cursor-pointer hover:bg-gray-100">asdasd</li>
                                        </ul>
                                    )}
                            </div>
                                <textarea id="CreateProfile" placeholder='Profile Description' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                                </div>
                            <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModal}>Close</button>
                            <button type='submit' className='p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300'>Create</button> {/* add onclick to create into database */}
                        </Modal>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const CreateP = () => {
  
    return (
      <div id='createA' className='flex'>
        <Dashboard/>
        <SignProfile/>
      </div>
    );
  };

export default CreateP;