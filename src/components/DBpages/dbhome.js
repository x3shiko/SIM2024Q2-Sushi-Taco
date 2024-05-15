import React from "react";
import Dashboard from "./dashboard";
import { viewProfilesController } from "../../controller";

const DBhome = () => {
  return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      <div className="flex gap-4 justify-center font-mono font-semibold">
        Welcome, System Administrator
      </div>
    </div>
  );
};

const DBHome = () => {
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
      <Dashboard />
      <DBhome data={profileStatus}/>
    </div>
  );
};

export default DBHome;
