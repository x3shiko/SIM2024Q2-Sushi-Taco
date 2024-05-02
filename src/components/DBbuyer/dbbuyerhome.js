import React from 'react';
import DashboardBuyer from './dbbuyer';

const DBhome = () => {
    return (
<div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
<div className="flex gap-4 justify-center font-mono font-semibold">
    Welcome, <span id='buyer'>Buyer</span> {/* Buyer's name using ID */}
</div>
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
