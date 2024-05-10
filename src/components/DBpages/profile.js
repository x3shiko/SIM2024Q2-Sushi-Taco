import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Dashboard from "./dashboard";
import { createProfileController, updateProfileController, viewProfilesController, viewAccountController, updateAccountController, addUserIDsToProfileController } from "../../controller";

const StatusColor = ({ type }) => {
  // Status dot color function
  let statusDot = "flex w-3 h-3 ml-10 rounded-full"; // circle shape
  switch (type) {
    case "suspend":
      statusDot += " bg-red-500"; // red when suspend
      break;
    case "unsuspend":
      statusDot += " bg-green-500"; // green when unsuspend
      break;
    default:
      statusDot += " bg-gray-500"; // grey when no status
  }

  return <span className={statusDot}></span>;
};

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false); // false statee for assign profile profile modal
  const [isOpenCreateP, setIsOpenCreateP] = useState(false); // false statee for create profile modal
  const [isOpenEdit, setIsOpenEdit] = useState(false); // false statee for edit profile modal
  const [profileShow, setProfileShow] = useState(false);
  const [whenChange, setChange] = useState("");
  const [edit, setEdit] = useState("");
  const [showProfileN, setShowProfileN] = useState(false); //state for profile name modal
  const [showProfileD, setShowProfileD] = useState(false); //state for profile description modal
  const [showProfileS, setShowProfileS] = useState(false); //state for profile suspend modal
  const [editProfile, setEditProfile] = useState(""); //state for edit profile
  const [editSuspend, setEditSuspend] = useState(""); //state for edit suspend
  const [profileDescription, setProfileDescription] = useState("");
  const [profiles, setProfiles] = useState([])
  const [updateProfileStatus, setUpdateProfileStatus] = useState("")
  const [profileUpdate, setProfileUpdate] = useState("")
  const [profileIDToUpdate, setProfileIDToUpdate] = useState("")
  const [updateValue, setUpdateValue] = useState("")
  const [accounts, setAccounts] = useState([])
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [profileNameToUpdate, setProfileNameToUpdate] = useState('')

  const toggleChange = () => setProfileShow(!profileShow); // toggle profile search
  // toggle Profile Name
  const toggleProfileN = () => {
    setShowProfileN(!showProfileN)
  };
  // toggle Profile Description
  const toggleProfileD = () => {
    setProfileUpdate("profileDescription")
    setShowProfileD(!showProfileD)
  };
  // toggle Profile Suspend
  const toggleProfileS = () => {
    setProfileUpdate("status")
    setShowProfileS(!showProfileS)
  };

  // handle edit profile
  const handleEditProfile = (e) => {
    setEditProfile(e.target.value);
  };

  // handle edit suspend
  const handleEditSuspend = (e) => {
    setEditSuspend(e.target.value);
  };

  // assign profile open/close modal
  const openModal = (profileID, profileName) => {
    setProfileIDToUpdate(profileID)
    setProfileNameToUpdate(profileName)
    setIsOpen(true)
  };
  const closeModal = () => setIsOpen(false);
  // create profile open/close modal
  const openModalCreateP = () => setIsOpenCreateP(true);
  const closeModalCreateP = () => setIsOpenCreateP(false);
  // edit profile open/close modal
  const openModalEdit = (profileID) => {
    setProfileIDToUpdate(profileID)
    setIsOpenEdit(true)
  };
  const closeModalEdit = () => setIsOpenEdit(false);

  useEffect(() => {
    const fetchProfiles = async () => {
        const profiles = await viewProfilesController.viewProfiles()
        setProfiles(profiles)
    };
    const fetchAccounts = async () => {
      const fetchedAccounts = await viewAccountController.getAccounts()
      setAccounts(fetchedAccounts);
    };

    fetchAccounts();
    fetchProfiles();
}, []);

//assign profile
const handleCheckboxChange = (accountId) => {
  setSelectedAccounts((prevSelectedAccounts) => {
    if (prevSelectedAccounts.includes(accountId)) {
      return prevSelectedAccounts.filter((id) => id !== accountId);
    } else {
      return [...prevSelectedAccounts, accountId];
    }
  });
};

const handleAssignButtonClick = () => {
  //update user's profile
  selectedAccounts.map(async (userID) => {
    await updateAccountController.updateAccount(userID, {
      profile: profileNameToUpdate,
    });
    console.log(`Updated user ${userID} to ${profileNameToUpdate}`)
  })
  //update profile
  selectedAccounts.map(async (userID) => {
    await addUserIDsToProfileController.addUserIDsProfile(profileIDToUpdate, userID)
    console.log(`Add user ID ${userID} to profile ID ${profileIDToUpdate}`)
  })
  closeModal();
};

  // handle edit modal
  const handleEdit = (e) => {
    const value = e.target.value;
    console.log(value);
    setEdit(value);
    setShowProfileN(value === "profileN");
    setShowProfileD(value === "profileD");
    setShowProfileS(value === "profileS");
  };

  // search profile add the search data in here dont create new one
  const handleInputChange = (e) => {
    const value = e.target.value;
    setChange(value);
    if (setProfileShow(value === "profile")) {
      toggleChange(true);
    } else {
      toggleChange(false);
    }
  };

  const handleProfileDescription = (e) => {
    setProfileDescription(e.target.value)
  }

  const handleCreateProfile = async (e) => {
    e.preventDefault()
    let profileName = whenChange
    await createProfileController.createProfile(profileName, profileDescription)
    closeModalCreateP()
  }

  const handleUpdateValue = (e) => {
    setUpdateValue(e.target.value)
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    let fieldToUpdate = {}
    console.log(edit)
    if (edit === "profileN"){
      fieldToUpdate = {
        profileName: updateValue
      }
    } else if (edit === 'profileD'){
      fieldToUpdate = {
        profileDescription: updateValue
      }
    } else if (edit === 'profileS'){
      fieldToUpdate = {
        status: editSuspend
      }
    }
    else{
      console.log("No field to update")
    }
    await updateProfileController.updateProfile(profileIDToUpdate, fieldToUpdate)
    closeModalEdit()
  }

  return (
    <div className="min-h-screen w-3/4 overflow-x-auto">
      {/* create profile button and modal */}
      <div className="container mx-auto mt-4 flex justify-evenly">
        <button
          className="flex m-4 p-3 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600"
          onClick={openModalCreateP}
        >
          Create Profile
        </button>
        {/* search profile input */}
        <div className="flex my-2 items-center">
          <input
            type="text"
            placeholder="Search by Profile"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
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
              Edit
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
          {profiles.map((profile) => (
            <tr>
            {/* add profile and profile description data into the td */}
            {/* add status color to the status base on types*/}
            <td>
            {profile.status === 'Active' ? (
              <StatusColor type="unsuspend" />
            ) : (
              <StatusColor type="suspend" />
            )}
            </td>
            <td className="m-2 px-6 py-4 whitespace-nowrap">{profile.profileName}</td>
            <td className="m-2 px-6 py-4 whitespace-nowrap">{profile.profileDescription}</td>
            <td>
              <button
                className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600"
                onClick={() => openModalEdit(profile.id)}
              >
                Edit
              </button>
            </td>

            <td>
              <button
                className="m-2 p-4 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600"
                onClick={() => openModal(profile.id, profile.profileName)}
              >
                Assign Profile
              </button>
            </td>
          </tr>
          ))}
            {/* create profile modal here */}
            <Modal
              isOpen={isOpenCreateP}
              onRequestClose={closeModalCreateP}
              className="block p-2 w-1/2 mx-auto bg-gray-600"
            >
              <form onSubmit={handleCreateProfile}>
              <div className="flex p-3 mb-2 border-b-4 justify-evenly align-middle text-white">
                Create Profile
              </div>{" "}
              {/* header*/}
              {/* input search */}
              <div className="flex my-4 items-center justify-center">
                <input
                  type="text"
                  placeholder="Profile Name"
                  value={whenChange}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="my-4 border-b-2">
                <textarea
                  id="CreateProfile"
                  placeholder="Profile Description"
                  onChange={handleProfileDescription}
                  className="my-2 h-32 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                className="p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
                onClick={closeModalCreateP}
              >
                Close
              </button>
              <button type="submit" className="p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300">
                Create
              </button>
              </form>
            </Modal>
            {/* edit profile modal here */}
            <Modal
              isOpen={isOpenEdit}
              onRequestClose={closeModalEdit}
              className="block p-2 w-1/2 mx-auto bg-gray-600"
            >
              <form onSubmit={handleUpdateProfile}>
              <div className="flex p-3 mb-5 border-b-4 justify-evenly align-middle text-white">
                Select Changes
              </div>{" "}
              {/* header*/}
              <div className="mt-4 mb-3">
                <label
                  htmlFor="roles"
                  className="block mb-4 text-sm font-medium text-white"
                >
                  Select Changes
                </label>
                <select
                  id="roles"
                  value={edit}
                  onChange={handleEdit}
                  className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Edit
                  </option>
                  <option value="profileN" onClick={toggleProfileN}>
                    Profile Name
                  </option>
                  <option value="profileD" onClick={toggleProfileD}>
                    Profile Description
                  </option>
                  <option value="profileS" onClick={toggleProfileS}>
                    Suspend Profile
                  </option>
                </select>
              </div>
              {/* Profile Name add their data for each option */}
              {showProfileN && (
                <div className="mt-4 mb-3 border-b-2">
                  <textarea
                    id="editProfileN"
                    placeholder="Profile Name"
                    onChange={handleUpdateValue}
                    className="my-2 h-20 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              )}
              {/* Profile Description add save data for textarea */}
              {showProfileD && (
                <div className="mt-4 mb-3 border-b-2">
                  <textarea
                    id="editProfileD"
                    placeholder="Profile Description"
                    onChange={handleUpdateValue}
                    className="my-2 h-32 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              )}
              {/* Profile Suspend add data to save suspend */}
              {showProfileS && (
                <div className="mt-4 mb-3 border-b-2">
                  <label
                    htmlFor="roles"
                    className="block mb-4 text-sm font-medium text-white"
                  >
                    Suspend Profile
                  </label>
                  <select
                    id="roles"
                    value={editSuspend}
                    onChange={handleEditSuspend}
                    className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Suspend Profile
                    </option>
                    <option value="Suspend">Suspend</option>
                    <option value="Active">Unsuspend</option>
                  </select>
                </div>
              )}
              <button
                className="p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
                onClick={closeModalEdit}
              >
                Close
              </button>
              {/* Add onclick to edit the profile*/}
              <button
                type="submit"
                className="p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
              >
                Edit
              </button>
              </form>
            </Modal>
            {/* assign profile modal here */}
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              className="block p-2 w-3/4 mx-auto bg-gray-600"
            >
              <div className="flex p-3 mb-2 border-b-4 justify-evenly align-middle text-white">
                Assign Profile
              </div>{" "}
              {/* header*/}
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
                  {accounts.map((account) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">{account.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{account.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleCheckboxChange(account.id)}
                        className="ml-9 mt-4 w-5 h-5 text-blue-600 bg-gray-100
                                              border-gray-300 rounded focus:ring-blue-500
                                                dark:focus:ring-blue-600 dark:ring-offset-gray-800
                                                focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300"
                onClick={closeModal}
              >
                Close
              </button>
              <button onClick={handleAssignButtonClick} className="p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300">
                Assign
              </button>
            </Modal>
        </tbody>
      </table>
    </div>
  );
};

const ProfileDB = () => {
  return (
    <div id="profile" className="flex">
      <Dashboard />
      <Profile />
    </div>
  );
};
export default ProfileDB;
