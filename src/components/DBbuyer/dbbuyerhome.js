import React from 'react';
import DashboardBuyer from './dbbuyer';

const DBhome = () => {
    return (
<div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
    <h1 className="flex gap-4 justify-center font-mono font-semibold">
        Welcome, <span id='buyer'>Buyer</span> {/* Buyer's name using ID */}
    </h1>
    {/* Buyer's profile add their profile in here */}
    <p className="flex gap-4 justify-center">
        Hi I am a buyer interested to buy around Serangoon
    </p>
</div>
    );
};

const DBBuyerHome = () => {
    return (
        <div id='dbhome' className="flex item-start">
            <DashboardBuyer />
            <DBhome/>
      </div>
    );
};

export default DBBuyerHome;
