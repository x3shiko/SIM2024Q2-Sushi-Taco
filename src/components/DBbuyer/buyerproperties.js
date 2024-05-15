import { useEffect, useState, useCallback} from "react";
import DashboardBuyer from "./dbbuyer";
import {
  viewPropertiesController,
  savePropertyToUserController,
  searchPropertiesByLocationController,
} from "../../controller";
import { currentUser } from "../../firebase/firebase";

const BProperties = ({ data, onSearch }) => {
  const [query, setQuery] = useState("");
  // to show sold/unsold property
  const [showSold, setShowSold] = useState(true);
  const [showUnsold, setShowUnsold] = useState(true);
  const [selectSS, setSelectSS] = useState("");
  const [properties, setProperties] = useState([]);
  const [soldProperties, setSoldProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showFilteredProperties, setShowFilteredProperties] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      const properties = await viewPropertiesController.fetchProperties();
      const unSoldProperties = properties.filter(
        (property) => property.status === "unsold"
      );
      const soldProperties = properties.filter(
        (property) => property.status === "sold"
      );
      setProperties(unSoldProperties);
      setSoldProperties(soldProperties);
    };
    fetchProperties();
  }, []);

  //toggle for sold/unsold property
  const toggleSold = () => setShowSold(!showSold);
  const toggleUnsold = () => setShowUnsold(!showUnsold);

  //handle sold/unsold selection
  const handleSelectSS = (e) => {
    const value = e.target.value;
    setSelectSS(value);
    setShowSold(value === "sold");
    setShowUnsold(value === "unsold");
  };

  //handle search input
  const handleInputChange = useCallback( async (e) => {
      const inputValue = e.target.value;
      setQuery(inputValue.toLowerCase());
      if (inputValue === "") {
        setShowFilteredProperties(false);
      } else {
        setShowFilteredProperties(true);
        const filtered = await searchPropertiesByLocationController.searchPropertyByLocation(inputValue)
        setFilteredProperties(filtered);
      }
    },
    [properties]
  );

  const handleSaveProperty = async (propertyID) => {
    await savePropertyToUserController.saveProperty(
      currentUser.uid,
      propertyID
    );
    console.log(
      `User ID ${currentUser.uid} have save the property ID ${propertyID}`
    );
  };

  return (
    <div className="min-h-screen w-3/4 overflow-x-auto">
      {/* Search input */}
      <div className="flex mt-2 items-center justify-center">
        <input
          type="text"
          placeholder="Search by area..."
          value={query}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Sold/Unsold selection */}
      <div className="my-3">
        <select
          id="roles"
          value={selectSS}
          onChange={handleSelectSS}
          className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select Sold/Unsold Properties
          </option>
          <option value="sold" onClick={toggleSold}>
            Sold
          </option>
          <option value="unsold" onClick={toggleUnsold}>
            Unsold
          </option>
        </select>
      </div>
      {/* Start of Property Grid */}
      <div className="grid grid-cols-3 grid-rows-3 my-3">
        {/* show sold properties */}
        {!showFilteredProperties && showSold &&
          soldProperties.map((soldProperty) => (
            <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={soldProperty.image}
                alt="Placeholder"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {soldProperty.address}
                </div>
                <p className="text-green-500 text-base">{"$" + soldProperty.price}</p>
                <p className="text-gray-700 text-base">
                  {soldProperty.description}
                </p>
              </div>
              <div className="px-6 py-4">
                {/* doesnt need any function or buy */}
                <button
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  disabled
                >
                  Sold
                </button>
                {/* Save property please edit the id to its corresponding object*/}
                {/*<button id='sold1' onClick={handleSave} className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ${isSaved ? 'bg-green-500' : ''}`}>
                                                Save
                                    </button>*/}
                <button
                  onClick={() => handleSaveProperty(soldProperty.id)}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
          {showFilteredProperties &&
          filteredProperties.map((filteredProperty) => (
            <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={filteredProperty.image}
                alt="Placeholder"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {filteredProperty.address}
                </div>
                <p className="text-green-500 text-base">{"$" + filteredProperty.price}</p>
                <p className="text-gray-700 text-base">
                  {filteredProperty.description}
                </p>
              </div>
              <div className="px-6 py-4">
                {/* doesnt need any function or buy */}
                <button
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  disabled
                >
                  Sold
                </button>
                {/* Save property please edit the id to its corresponding object*/}
                {/*<button id='sold1' onClick={handleSave} className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ${isSaved ? 'bg-green-500' : ''}`}>
                                                Save
                                    </button>*/}
                <button
                  onClick={() => handleSaveProperty(filteredProperty.id)}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        {/* show unsold properties */}
        {!showFilteredProperties && showUnsold &&
          properties.map((property) => (
            <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={property.image} alt="Placeholder" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{property.address}</div>
                <p className="text-green-500 text-base">{"$" + property.price}</p>{" "}
                {/* If u save property price can add here */}
                <p className="text-gray-700 text-base">
                  {property.description}
                </p>
              </div>
              <div className="px-6 py-4">
                <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Buy
                </button>
                {/* Save property please edit the id to its corresponding object*/}
                {/* We need to figure out together how to save for frontend and backend*/}
                {/*<button id='unsold1' onClick={handleSave} className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ${isSaved ? 'bg-green-500' : ''}`}>
                                                Save
                                    </button>*/}
                <button
                  onClick={() => handleSaveProperty(property.id)}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
const viewBP = () => {
  return (
    <div id="viewA" className="flex">
      <DashboardBuyer />
      <BProperties />
    </div>
  );
};
export default viewBP;
