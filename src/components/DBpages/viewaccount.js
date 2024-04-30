import React,{useState} from 'react';
import Dashboard from './dashboard';

const TableA = ({ data, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setQuery(inputValue);
      onSearch(inputValue);
    };

    return (
        
        <div className="min-h-screen w-3/4 overflow-x-auto">
            {/* Search input */}
                <div className="flex my-2 items-center justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                </div>
            <table className="min-w-full divide-y divide-gray-200">
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
                            Role
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample data */}
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">John</td>
                        <td className="px-6 py-4 whitespace-nowrap">Doe</td>
                        <td className="px-6 py-4 whitespace-nowrap">johndoedoe@gmail.com</td>
                        <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                        <td className="px-6 py-4 whitespace-nowrap">Normal</td>
                        {/*<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="##" className="text-indigo-600 hover:text-indigo-900">
                                Edit
                            </a>
                        </td>*/}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
const ViewA = () => {
  
    return (
      <div id='viewA' className='flex'>
        <Dashboard/>
        <TableA/>
      </div>
    );
  };

export default ViewA;