import React, { useEffect, useState } from "react";
import DBSeller from "./dbseller";
import { getSellingPropertiesController } from "../../controller";

const SellerProperties = () => {
  const [sellingProperties, setSellingProperties] = useState([]);

  useEffect(() => {
    const fetchSellingProperties = async () => {
      const properties = await getSellingPropertiesController.getSellingProperties();
      setSellingProperties(properties);
    };
    fetchSellingProperties();
  }, []);

  const countNoOfShortListed = (userIDs) => {
    let shortListedAmount = 0
    sellingProperties.map((property) => {
      const savedByUserID = property.savedByUserID;
      if (Array.isArray(savedByUserID)) {
        shortListedAmount += savedByUserID.length;
      }
    })
  }

  return (
    <div className="min-h-screen w-3/4 overflow-x-auto">
      {/* Start of Property Grid */}
      <div className="grid grid-cols-3 grid-rows-3 my-3">
        {/* show properties listing */}
        {/* add image/address/description data here */}
        {sellingProperties.map((property) => (
          <div className="m-3 max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={property.image} alt="Placeholder" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{property.address}</div>
              <p className="text-green-500 text-base">{"$" + property.price}</p>{" "}
              {/* If u save property price can add here */}
              <p className="text-gray-700 text-base">{property.description}</p>
            </div>
            <div className="px-6 py-4">
              {/* Using buttons for the shape */}{" "}
              {/* add save count data in span */}
              <button
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                disabled
              >
                <span className="font-semibold mr-1">{property.savedByUserID.length}</span>
                Saved
              </button>
              <button
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                disabled
              >
                <span className="font-semibold mr-1">11</span>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const viewSP = () => {
  return (
    <div id="viewA" className="flex">
      <DBSeller />
      <SellerProperties />
    </div>
  );
};
export default viewSP;
