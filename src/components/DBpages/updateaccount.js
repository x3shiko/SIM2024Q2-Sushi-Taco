import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Dashboard from './dashboard';
import { viewAccountController, updateProfileController } from '../../controller';

const TableU = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [update, setUpdate] = useState('');
    const [showRole, setShowRole] = useState(true); //pop out for roles
    const [assignroles, setAssignRoles] = useState(''); // handle roles
    const [showEmail, setShowEmail] = useState(true); //pop out for Email
    const [showPassword, setShowPassword] = useState(true); //pop out for Password
    const [accounts, setAccounts] = useState([])
    const [accountUpdating, setAccountUpdating] = useState(null)

    const openModal = (userID) => {
        setAccountUpdating(userID)
        console.log(userID)
        setIsOpen(true)
    }; // open modal
    const closeModal = () => setIsOpen(false);

    const toggleRole = () => setShowRole(!showRole); // toggle role
    const toggleEmail = () => setShowEmail(!showEmail); // toggle email
    const togglePassword = () => setShowPassword(!showPassword); // toggle password

    const handleAssignRole = (e) => { // handle roles
        setAssignRoles(e.target.value);
    };
    const fetchAccounts = async () => {
            const fetchedAccounts = await viewAccountController.getAccounts()
            setAccounts(fetchedAccounts);
        };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const updateAccount = async (e) => {
        e.preventDefault();
        try {
            if (update === 'role' && assignroles !== '') {
                // Update user role
                await updateProfileController.updateProfile(accountUpdating, { role: assignroles });
                console.log(`Successfully changed user role to ${assignroles}`);
            } else if (update === 'emails') {
                // Update user email
            } else if (update === 'passwords') {
                // Update user password
            } else {
                console.log('No valid update operation selected.');
            }
            fetchAccounts();
            closeModal();
        } catch (error) {
            console.error('Error updating account:', error);
        }
    }

    const handleUpdate = (e) => {
        const value = e.target.value;
        console.log(value)
        setUpdate(value);
        setShowRole(value === 'role');
        setShowEmail(value === 'emails');
        setShowPassword(value === 'passwords');
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Confim Email:', email);
        setEmail('');
    }
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        console.log('Password:', password);
        console.log('Confirm Password:', password);
        setPassword('');
    }

    return (
        <div className="min-h-screen w-3/4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
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
                            Role
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample data */}
                    {accounts && accounts.map((account) => (
                        <tr key={account.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{account.firstName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{account.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{account.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{account.status}</td>
                            <button className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600" onClick={() => openModal(account.id)}>
                                Update
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isOpen} onRequestClose={closeModal} className="block p-2 w-1/2 mx-auto bg-gray-600">
                <div className='flex p-3 mb-5 border-b-4 justify-evenly align-middle text-white'>Select Changes</div> {/* header*/}
                    <div className="mt-4 mb-3">
                    <label htmlFor="roles" className="block mb-4 text-sm font-medium text-white">Select Changes</label>
                        <select id="roles" value={update} onChange={handleUpdate} className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="" disabled>Select changes</option>
                            <option value="role" onClick={toggleRole}>Roles</option>
                            <option value="emails" onClick={toggleEmail}>Email</option>
                            <option value="passwords" onClick={togglePassword}>Password</option>
                        </select>
                        {/* Roles update */}
                        {showRole && (
                    <div className="mt-4 mb-3 border-b-2">
                        <label htmlFor="roles" className="block mb-4 text-sm font-medium text-white">Roles</label>
                        <select id="roles" value={assignroles} onChange={handleAssignRole} className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="" disabled>Assign role</option>
                            <option value="buyer">Buy</option>
                            <option value="seller">Sell</option>
                            <option value="agency">Agent</option>
                        </select>
                    </div>
                        )}
                        {/* Email Update */}
                        {showEmail && (
                    <form onSubmit={handleSubmitEmail}>
                        <div className="my-4 border-b-2">
                            <input type="email" id="email" placeholder='Email' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            <input type='email' id="email" placeholder='Confirm Email' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                    </form>
                    )}
                    {/* Password Update */}
                        {showPassword && (
                    <form onSubmit={handleSubmitPassword}>
                        <div className="my-4 border-b-2">
                            <input type='password' id="password" placeholder='Password' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            <input type='password' id="password" placeholder='Confirm Password' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                    </form>
                    )}
                    </div>
                <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModal}>Close</button>
                <button type='submit' className='p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={updateAccount}>Update</button>
            </Modal>
        </div>
    );
};

const UpdateA = () => {
  
    return (
      <div id='updateA' className='flex'>
        <Dashboard/>
        <TableU/>
      </div>
    );
  };

export default UpdateA;