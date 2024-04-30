import React, { useState } from 'react';
import Modal from 'react-modal';
import Dashboard from './dashboard';


const TableR = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [assignroles, setAssignRoles] = useState('');

    const handleAssignRole = (e) => {
        setAssignRoles(e.target.value);
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
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
                            Username
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Role
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="m-2 px-6 py-4 whitespace-nowrap">John Doe</td>
                        <td className="m-2 px-6 py-4 whitespace-nowrap">johndoedoe</td>
                        <td className="m-2 px-6 py-4 whitespace-nowrap">Admin</td>
                        <button className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600" onClick={openModal}>
                            Assign
                        </button>
                        <Modal isOpen={isOpen} onRequestClose={closeModal} className="block p-2 w-1/2 mx-auto bg-gray-600">
                            <div className='flex p-3 mb-5 border-b-4 justify-evenly align-middle text-white'>Assign Role</div> {/* header*/}
                                <div className="mt-4 mb-3 border-b-2">
                                    <label htmlFor="roles" className="block mb-4 text-sm font-medium text-white">Roles</label>
                                    <select id="roles" value={assignroles} onChange={handleAssignRole} className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="" disabled>Assign role</option>
                                    <option value="buyer">Buy</option>
                                    <option value="seller">Sell</option>
                                    <option value="agency">Agent</option>
                                    </select>
                                </div>
                            <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModal}>Close</button>
                            <button className='p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' >Change</button>
                        </Modal>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const AssignR = () => {
  
    return (
      <div id='assignR' className='flex'>
        <Dashboard/>
        <TableR/>
      </div>
    );
  };
export default AssignR;