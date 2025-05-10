



import React from 'react';
import { Link } from 'react-router-dom';

const UserDetailsTable = ({ records, firstIndex = 0 }) => {
  const TABLE_HEAD = [
    "S.no", 
    "Industry Name", 
    "Platform Name", 
    "Profession Name", 
    "SubProfession Name"
  ];

  return (
    <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 my-6">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
        <h3 className="text-lg font-semibold">Industry Professionals</h3>
      </div>
      
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                      {firstIndex + index + 1}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.industryName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-sm font-medium leading-5 ">
                    {item.platformName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {item.professionName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {item.subproffession}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
    </div>
  );
};

export default UserDetailsTable;


