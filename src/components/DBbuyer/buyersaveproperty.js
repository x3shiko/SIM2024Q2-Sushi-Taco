import { useState, useEffect } from "react";
import DashboardBuyer from "./dbbuyer";
import { getSavedPropertiesController } from "../../controller";

const BuyerSaveProperty = () => {
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      const properties =
        await getSavedPropertiesController.getSavedProperties();
      setSavedProperties(properties);
    };
    fetchSavedProperties();
  }, []);

  return (
    <div className="grid grid-cols-3 grid-rows-3 p-4 min-h-screen w-3/4 overflow-x-auto">
      {savedProperties.map((savedProperty) => (
        <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={savedProperty.image} alt="img1" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {savedProperty.address}
            </div>
            <p className="text-green-500 text-base">$500,000</p>{" "}
            {/* If u save property price can add here */}
            <p className="text-gray-700 text-base">
              {savedProperty.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const viewSaveBP = () => {
  return (
    <div id="viewA" className="flex">
      <DashboardBuyer />
      <BuyerSaveProperty />
    </div>
  );
};
export default viewSaveBP;
