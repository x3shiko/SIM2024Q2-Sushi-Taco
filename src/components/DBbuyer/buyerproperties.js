import React,{useState} from 'react';
import DashboardBuyer from './dbbuyer';
import Image1 from "../../assets/1.png";
import Image2 from "../../assets/2.png";

const BProperties = ({ data, onSearch}) => {
    const [query, setQuery] = useState('');
    // to show sold/unsold property
    const [showSold, setShowSold] = useState(true);
    const [showUnsold, setShowUnsold] = useState(true);
    const [selectSS, setSelectSS] = useState('');


    //toggle for sold/unsold property
    const toggleSold = () => setShowSold(!showSold);
    const toggleUnsold = () => setShowUnsold(!showUnsold);

    //handle sold/unsold selection
    const handleSelectSS = (e) => {
        const value = e.target.value;
        setSelectSS(value);
        setShowSold(value === 'sold');
        setShowUnsold(value === 'unsold');
    };

    //handle search input
    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setQuery(inputValue);
      onSearch(inputValue);
    };

    return (
        
        <div className="min-h-screen w-3/4 overflow-x-auto">
            {/* Search input */}
                <div className="flex mt-2 items-center justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                </div>
                <div className="my-3">
                                    <select id="roles" value={selectSS} onChange={handleSelectSS} className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value=""disabled>Select Sold/Unsold Properties</option>
                                        <option value="sold" onClick={toggleSold}>Sold</option>
                                        <option value="unsold"onClick={toggleUnsold}>Unsold</option>
                                    </select>
                                    {/* show sold properties */}
                                    {showSold && (
                                        <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
                                        <img
                                        className="w-full"
                                        src={Image1}
                                        alt="Placeholder"
                                        />
                                        <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">123 Main St</div>
                                        <p className="text-gray-700 text-base">
                                            House Description: 3 bd | 2 ba | 1,500 sqft
                                            Price:              $500,000
                                        </p>
                                        </div>
                                        <div className="px-6 py-4">
                                            {/* doesnt need any function or buy */}
                                            <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" disabled>
                                                Sold
                                            </button>
                                            {/* Save property please edit the id to its corresponding object*/}
                                            {/*<button id='sold1' onClick={handleSave} className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ${isSaved ? 'bg-green-500' : ''}`}>
                                                Save
                                    </button>*/}
                                            <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                        Save
                                            </button>
                                        </div>
                                    </div>
                                    )}
                                    {/* show unsold properties */}
                                    {showUnsold && (
                                        <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
                                            <img
                                            className="w-full"
                                            src={Image2}
                                            alt="Placeholder"
                                            />
                                            <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">456 Oak St</div>
                                            <p className="text-gray-700 text-base">
                                                House Description: 4 bd | 3 ba | 2,000 sqft
                                                Price:            $750,000
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
                                            <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                        Save
                                            </button>
                                            </div>
                                        </div>
                                        )}
                                </div>
            </div>
    );
};
const viewBP = () => {
  
    return (
      <div id='viewA' className='flex'>
        <DashboardBuyer/>
        <BProperties/>
      </div>
    );
  };
export default viewBP;