import React from 'react';
import Dashboard from './dashboard';

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
    return (
        <div id='dbhome' className="flex item-start">
            <Dashboard />
            <DBhome/>
      </div>
    );
};

export default DBHome;
