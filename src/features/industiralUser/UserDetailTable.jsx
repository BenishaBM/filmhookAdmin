// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Typography } from '@material-tailwind/react'; // Assuming you are using Material Tailwind

// const TABLE_HEAD = ["S.no", "Industry Name", "Platform Name", "Profession Name", "Film Count", "Net Worth", "Daily Salary"];

// const UserDetailsTable = ({ records, firstIndex = 0 }) => {
//   return (
//     <table className="w-[95%] min-w-max table-auto text-left my-3">
//       <thead>
//         <tr>
//           {TABLE_HEAD.map((head, index) => (
//             <th
//               key={index}
//               className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//             >
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-normal leading-none opacity-70"
//               >
//                 {head}
//               </Typography>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {records.map((item, index) => {
//           const isLast = index === records.length - 1;
//           const classes = isLast
//             ? "px-4 py-[1rem]"
//             : "px-4 py-[0.05rem] border-b border-blue-gray-50";
//           return (
//             <tr key={item.id} className="even:bg-blue-gray-50/50">
//               <td className={classes}>
//                 <div className="flex items-center gap-3">
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-bold"
//                   >
//                     {firstIndex + index + 1}
//                   </Typography>
//                 </div>
//               </td>
//               <td className={classes}>
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal"
//                 >
//                   {item.industryName}
//                 </Typography>
//               </td>
//               <td className={classes}>
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal"
//                 >
//                   {item.platformName}
//                 </Typography>
//               </td>
//               <td className={classes}>
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal"
//                 >
//                   {item.professionName}
//                 </Typography>
//               </td>
//               <td className={classes}>
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal"
//                 >
//                   {item.filmCount}
//                 </Typography>
//               </td>
//               <td className={classes}>
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal"
//                 >
//                   {item.netWorth}
//                 </Typography>
//               </td>
//               <td className={classes}>
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal"
//                 >
//                   {item.dailySalary}
//                 </Typography>
//               </td>
//               {/* <td className={classes}>
//                 <Link
//                   to={`/layout/unverified_userdetails/${item.userId}`}
//                   className="text-blue-600"
//                 >
//                   View
//                 </Link>
//               </td> */}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default UserDetailsTable;









import React from 'react';
import { Link } from 'react-router-dom';

const UserDetailsTable = ({ records, firstIndex = 0 }) => {
  const TABLE_HEAD = [
    "S.no", 
    "Industry Name", 
    "Platform Name", 
    "Profession Name", 
    // "Film Count", 
    // "Net Worth", 
    // "Daily Salary"
  ];

  return (
    <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 my-6">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
        <h3 className="text-lg font-semibold">Industry Professionals</h3>
      </div>
      
      {/* Search and Filter Section - Uncomment if needed */}
      {/*
      <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          Filter
        </button>
      </div>
      */}
      
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
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{item.filmCount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-bold text-gray-900">{item.netWorth}</div>
                  </div>
                </td> */}
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm font-medium text-gray-900">{item.dailySalary}</div>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination - Uncomment if needed */}
      {/*
      <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                4
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default UserDetailsTable;


