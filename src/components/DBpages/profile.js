import React,{ useState } from 'react';
import Modal from 'react-modal';
import Dashboard from './dashboard';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false); // false statee for assign profile profile modal
    const [isOpenCreateP, setIsOpenCreateP] = useState(false); // false statee for create profile modal
    const [assignroles, setAssignRoles] = useState('');
    const [profileShow, setProfileShow] = useState(false);
    const [whenChange, setChange] = useState('');

    const toggleChange = () => setProfileShow(!profileShow); // toggle role
    const handleAssignRole = (e) => {
        setAssignRoles(e.target.value);
    };

    // assign profile open/close modal
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    // create profile open/close modal
    const openModalCreateP = () => setIsOpenCreateP(true);
    const closeModalCreateP = () => setIsOpenCreateP(false);

    // search profile add the search data in here dont create new one
    const handleInputChange = (e) => {
        const value = e.target.value;
        setChange(value);
        if (setProfileShow(value === 'profile')) {
            toggleChange(true);
        }else{ 
            toggleChange(false);
        }

    };

    return (
<div className="min-h-screen w-3/4 overflow-x-auto">
    {/* create profile button and modal */}
    <div className="container mx-auto mt-4 flex justify-evenly">
                <button className="flex m-4 p-3 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600" onClick={openModalCreateP}>
                    Create Profile
                </button>
                {/* search profile input */}
                <div className="flex my-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Search by Profile"
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
                                </div>
                            </div>
                <Modal isOpen={isOpenCreateP} onRequestClose={closeModalCreateP} className="block p-2 w-1/2 mx-auto bg-gray-600">
                            <div className='flex p-3 mb-2 border-b-4 justify-evenly align-middle text-white'>Create Profile</div> {/* header*/}
                            {/* input search */}

                            <div className="flex my-4 items-center justify-center">
                                <input
                                    type="text"
                                    placeholder="Search Profile Name"
                                    value={whenChange}
                                    onChange={handleInputChange}
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                                {/* add their data accordingly to search profile */}
                                {profileShow && (
                                    <div className="relative h-auto justify-center items-center border rounded-md">
                                    <ul className="absolute p-1 top-0 w-40 bg-gray-400 z-auto">
                                        <li className="text-center text-white rounded-md hover:bg-gray-200 hover:text-black cursor-pointer">Profile 1</li>
                                    </ul>
                                    </div>
                                )}
                            </div>
                            <div className="my-4 border-b-2">
                                <textarea id="CreateProfile" placeholder='Profile Description' className="my-2 h-32 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            </div>
                            <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModalCreateP}>Close</button>
                            <button className='p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' >Create</button>
                        </Modal>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Profile
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Profile Description
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Assign
                                    </th>
                                </tr>
                            </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        {/* add profile and profile description data into the td */}
                        <td className="m-2 px-6 py-4 whitespace-nowrap">Profile</td>
                        <td className="m-2 px-6 py-4 whitespace-nowrap">Hi, I am a .....</td>
                        <button className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600" onClick={openModal}>
                            Assign Profile
                        </button>
                        {/* assign profile modal here */}
                        <Modal isOpen={isOpen} onRequestClose={closeModal} className="block p-2 w-3/4 mx-auto bg-gray-600">
                        <div className='flex p-3 mb-2 border-b-4 justify-evenly align-middle text-white'>Assign Profile</div> {/* header*/}
                        <table className="mb-5 min-w-full h-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            First Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Last Name
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
                                            Select
                                        </th>
                                    </tr>
                                </thead>
                                {/* Profile Data to select which profile to reassign */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">firstName</td>
                                            <td className="px-6 py-4 whitespace-nowrap">lastName</td>
                                            <td className="px-6 py-4 whitespace-nowrap">email</td>
                                            <input id="default-checkbox" type="checkbox" value="" 
                                            className="ml-9 mt-4 w-5 h-5 text-blue-600 bg-gray-100
                                             border-gray-300 rounded focus:ring-blue-500
                                              dark:focus:ring-blue-600 dark:ring-offset-gray-800
                                               focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        </tr>
                                </tbody>
                            </table>
                            <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModal}>Close</button>
                            <button className='p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' >Assign</button>
                        </Modal>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const ProfileDB = () => {
  
    return (
      <div id='profile' className='flex'>
        <Dashboard/>
        <Profile/>
      </div>
    );
  };
export default ProfileDB;