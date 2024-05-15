import React, { useEffect, useState } from "react";
import DBSeller from "./dbseller";
import { viewProfilesController } from "../../controller";

const SellerHome = () => {
  return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      <h1 className="flex gap-4 justify-center font-mono font-semibold">
        Welcome, <span id="seller">Seller</span> {/* Seller's name using ID */}
      </h1>
      {/* Seller's profile add their profile in here */}
      <p className="flex gap-4 justify-center">
        Hi I am a seller interested to sell around Serangoon
      </p>
    </div>
  );
};

const DBSellerHome = () => {
  const [profileStatus, setProfileStatus] = useState("");
  const checkProfileStatus = async () => {
    const profiles = await viewProfilesController.viewProfiles();
    let status;
    profiles.forEach((profile) => {
      if (profile.profileName === "Buyer") {
        status = profile.status;
      }
    });
    return status;
  };
  useEffect(() => {
    const fetchProfileStatus = async () => {
      const status = await checkProfileStatus();
      setProfileStatus(status);
    };

    fetchProfileStatus();
  }, []);
  return (
    <div id="dbhome" className="flex item-start">
      <DBSeller />
      <SellerHome data={profileStatus}/>
    </div>
  );
};

export default DBSellerHome;
