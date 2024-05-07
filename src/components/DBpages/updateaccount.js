import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Dashboard from './dashboard';
import { viewAccountController, updateAccountController } from '../../controller';

const ToggleButtonSuspend = () => {
    const [isToggledSuspend, setIsToggledSuspend] = useState(false); // state for toggle button for suspend
  
    // handle click for suspend button
    const handleClick = () => {
      setIsToggledSuspend((prevState) => !prevState);
    };
  
    return (
      <button className="mx-4 my-2 p-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300 focus:outline-none" onClick={handleClick}>
        {isToggledSuspend ? 'Suspend' : 'Unsuspend'}
      </button>
    );
  };

const TableU = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [update, setUpdate] = useState('');
    const [suspend, setSuspend] = useState(''); // state for suspend account
    const [showRole, setShowRole] = useState(false); //pop out for roles
    const [assignroles, setAssignRoles] = useState(''); // handle roles
    const [assignSuspend, setAssignSuspend] = useState(''); // handle suspend
    const [showEmail, setShowEmail] = useState(false); //pop out for Email
    const [showPassword, setShowPassword] = useState(false); //pop out for Password
    const [showProfileD, setShowProfileD] = useState(false); //pop out for Profile Description
    const [showSuspend, setShowSuspend] = useState(false); //pop out for Suspend
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
    const toggleProfileD = () => setShowProfileD(!showProfileD); // toggle Profile Description
    const toggleSuspend = () => setShowSuspend(!showSuspend); // toggle Suspend

    const handleAssignRole = (e) => { // handle roles
        setAssignRoles(e.target.value);
    };

    const handleAssignSuspend = (e) => { // handle Suspend
        setAssignSuspend(e.target.value);
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
                await updateAccountController.updateAccount(accountUpdating, { role: assignroles });
                console.log(`Successfully changed user role to ${assignroles}`);
            } else if (update === 'email') {
                // Update user email
                await updateAccountController.updateAccount(accountUpdating, { email: email });
            } else if (update === 'password') {
                // Update user password
                // changeUserPassword(accountUpdating, "321321")
                await updateAccountController.updateAccount(accountUpdating, { password: password });
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
        setShowEmail(value === 'email');
        setShowPassword(value === 'password');
        setShowProfileD(value === 'profileD');
        setShowSuspend(value === 'suspend');
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    // handle submit Suspend Account
    const handleSubmitSuspend = (e) => {
        e.preventDefault();
        console.log('Suspend:', suspend);
        setSuspend('');
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
                            Password
                        </th>
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
                            {/* password */}
                            <td className="px-6 py-4 whitespace-nowrap">123123</td>
                            <td className="px-6 py-4 whitespace-nowrap">{account.role}</td>
                            {/* profile description */}
                            <td className="px-6 py-4 whitespace-nowrap">I am .....</td>
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
                            <option value="role" onClick={toggleRole}>Profile</option>
                            <option value="email" onClick={toggleEmail}>Email</option>
                            <option value="password" onClick={togglePassword}>Password</option>
                            <option value="profileD" onClick={toggleProfileD}>Profile Description</option>
                            <option value="suspend" onClick={toggleSuspend}>Suspend</option>
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
                    <form>
                        <div className="my-4 border-b-2">
                            <input type="email" id="email" placeholder='Email' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            <input type='email' id="email" placeholder='Confirm Email' onChange={handleSubmitEmail} className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                    </form>
                    )}
                    {/* Password Update */}
                        {showPassword && (
                    <form>
                        <div className="my-4 border-b-2">
                            <input type='password' id="password" placeholder='Password' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            <input type='password' id="password" placeholder='Confirm Password' onChange={handleSubmitPassword} className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                    </form>
                    )}
                    {/* Update Profile Description */}
                        {showProfileD && (
                            <div className="my-4 border-b-2">
                                <textarea id="CreateProfile" placeholder='Profile Description' className="my-2 h-32 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            </div>
                    )}
                    {/* Suspend Account */}
                            {showSuspend && (
                                <form onSubmit={handleSubmitSuspend}>
                                    <div className="my-4 border-b-2">
                                    <select id="roles" value={assignSuspend} onChange={handleAssignSuspend} className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="" disabled>Choose Suspend</option>
                                        <option value="suspend">Suspend</option>
                                        <option value="suspendProfile">Suspend Profile</option>
                                        <option value="unsuspend">Unsuspend</option>
                                    </select>
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