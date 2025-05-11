

///the most most main working code ---------------------------------------------------




// import React, { useEffect, useState } from "react";
// import { PencilIcon } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";
// import { FaTrashCan } from "react-icons/fa6";
// import { GrPrevious ,GrNext} from "react-icons/gr";
// import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Card, CardFooter, CardHeader, Typography, Button, CardBody, Tooltip, Input, Switch, IconButton } from "@material-tailwind/react";
// import { useDispatch, useSelector } from "react-redux";
// import { getSubAdminListAction, deleteSubadminAction, changeSubadminActiveStatusAction } from "../../redux/slices/subAdminSlice";
// import Pagination from "../../component/Pagination";

// const TABLE_HEAD = ["S.No", "Name", "Email","Emp Id", "Status", "", ""];

// const SubAdminList = () => {
//   const dispatch = useDispatch();
//   const { subadminList, subadminListLoadingStatus, subadminListLoadinErrorMsg } = useSelector((state) => state.subadmin);
//   const [searchItem, setSearchItem] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const pageDetails = { pageNo: currentPage, pageSize: 10 };
//     dispatch(getSubAdminListAction(pageDetails));
//   }, [dispatch, currentPage]);

//   const handleSearch = (e) => {
//     setSearchItem(e.target.value);
//   };

//   const handlePageClicked = (page) => {
//     setCurrentPage(page);
//   };

//   const filteredSubadminList = subadminList.filter((item) =>
//     item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
//     item.email.toLowerCase().includes(searchItem.toLowerCase())
//   );

//   const recordsPerPage = 10;
//   const totalPages = Math.ceil(filteredSubadminList.length / recordsPerPage);
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const records = filteredSubadminList.slice(firstIndex, lastIndex);

//   const handleDeleteSubAdmin = (userId) => {
//     dispatch(deleteSubadminAction(userId)).then(() => {
//       const pageDetails = { pageNo: currentPage, pageSize: 10 };
//       dispatch(getSubAdminListAction(pageDetails));
//     });
//   };

//   const handleToggleChange = (subadmin) => {
//     const details = {
//       userId: subadmin.userId,
//       adminPageStatus: !subadmin.adminPageStaus, 
//     };
//     dispatch(changeSubadminActiveStatusAction(details)).then(() => {
//       const pageDetails = { pageNo: currentPage, pageSize: 10 };
//       dispatch(getSubAdminListAction(pageDetails));
//     });
//   };


//   const renderPagination = () => {  
//     const pageNumbers = [];
//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         pageNumbers.push(1, 2, 3, 4, '...', totalPages);
//       } else if (currentPage > totalPages - 3) {
//         pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
//       }
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className="flex items-center justify-center h-full w-full">
//       <div className="h-full w-[95%]">
//         <CardHeader floated={false} shadow={false} className="rounded-none">
//           <div className="mb-4 flex flex-col justify-end gap-8 md:flex-row md:items-center">
//             <div className="flex w-full shrink-0 gap-2 md:w-max mt-2">
//               <div className="w-full md:w-72">
//                 <Input
//                   label="Search"
//                   onChange={handleSearch}
//                   icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//                 />
//               </div>
//             </div>
//           </div>
//         </CardHeader>
//         <CardBody className="overflow-y-auto px-0">
//           {/* {subadminListLoadingStatus === "loading" && <div>Loading...</div>} */}
//           {subadminListLoadinErrorMsg && <div>Error While Loading Data</div>}
//           {subadminList && (
//             <table className="w-full min-w-max table-auto text-left">
//               <thead>
//                 <tr>
//                   {TABLE_HEAD.map((head, index) => (
//                     <th key={index} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
//                       <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
//                         {head}
//                       </Typography>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {records.map((item, index) => {
//                   const isLast = index === records.length - 1;
//                   const classes = isLast
//                     ? "px-4 py-[0.05rem]"
//                     : "px-4 py-[0.05rem] border-b border-blue-gray-50";

//                   return (
//                     <tr key={index} className="even:bg-blue-gray-50/50">
//                       <td className={classes}>
//                         <div className="flex items-center gap-3">
//                           <Typography variant="small" color="blue-gray" className="font-bold">
//                             {firstIndex + index + 1}
//                           </Typography>
//                         </div>
//                       </td>
//                       <td className={classes}>
//                         <Typography variant="small" color="blue-gray" className="font-normal">
//                           {item.name}
//                         </Typography>
//                       </td>
//                       <td className={classes}>
//                         <Typography variant="small" color="blue-gray" className="font-normal">
//                           {item.email}
//                         </Typography>
//                       </td>

//                       <td className={classes}>
//                         <Typography variant="small" color="blue-gray" className="font-normal">
//                           {item.empId}
//                         </Typography>
//                       </td>
//                       <td className={classes}>
//                         <Switch
//                           id="custom-switch-component"
//                           ripple={false}
//                           className="h-full w-full checked:bg-[#03c04a]"
//                           checked={item.adminPageStaus} 
//                           onChange={() => handleToggleChange(item)}
//                           containerProps={{ className: "w-9 h-5" }}
//                           circleProps={{ className: "before:hidden left-0.5 border-none h-4 w-4" }}
//                         />
//                       </td>
//                       <td className={classes}>
//                         <Tooltip content="Edit User">
//                           <Link to={`/layout/edit_subadmin/${item.userId}`}>
//                             <IconButton variant="text">
//                               <PencilIcon className="h-4 w-4 text-[#003285]" />
//                             </IconButton>
//                           </Link>
//                         </Tooltip>
//                       </td>
//                       <td className={classes}>
//                         <Tooltip content="Delete User">
//                           <IconButton variant="text">
//                             <FaTrashCan
//                               className="text-xl text-red-800"
//                               onClick={() => handleDeleteSubAdmin(item.userId)}
//                             />
//                           </IconButton>
//                         </Tooltip>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </CardBody>

//         <Pagination pagenumbers ={ renderPagination} currentPage ={currentPage} totalPages ={totalPages} handlePageClicked ={handlePageClicked }/>


//         {/* <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
//           <Button
//             variant="outlined"
//             size="sm"
//             onClick={() => handlePageClicked(currentPage - 1)}
//             disabled={currentPage === 1}
//             className=" mr-3"
//           >
//             <GrPrevious/>
//           </Button>
//           <div className="flex items-center gap-2">
//             {renderPagination().map((n, i) => (
//               <IconButton
//                 key={i}
//                 variant={n === currentPage ? "outlined" : "text"}
//                 size="sm"
//                 onClick={() => typeof n === 'number' && handlePageClicked(n)}
//                 disabled={n === '...'}
//                 className={n === '...' ? ' text-3xl flex items-center justify-center' : ''}
//               >
//                 {n}
//               </IconButton>
//             ))}
//           </div>
//           <Button
//             variant="outlined"
//             size="sm"
//             onClick={() => handlePageClicked(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className=" ml-3"
//           >
//            <GrNext/>
//           </Button>
//         </CardFooter> */}
//       </div>
//     </div>
//   );
// };

// export default SubAdminList;










import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardFooter, CardHeader, Typography, Button, CardBody, Tooltip, Input, Switch, IconButton, Select, Option } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getSubAdminListAction, deleteSubadminAction, changeSubadminActiveStatusAction } from "../../redux/slices/subAdminSlice";

const TABLE_HEAD = ["S.No", "Name", "Email", "Emp Id", "Status", "", ""];

const SubAdminList = () => {
  const dispatch = useDispatch();
  const { subadminList, subadminListLoadingStatus, subadminListLoadinErrorMsg } = useSelector((state) => state.subadmin);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectKey, setSelectKey] = useState(0); // For forcing re-render of Select component
  
  // Assuming t object for translations
  const t = {
    showingPage: "Showing Page",
    of: "of",
    previous: "Previous",
    next: "Next"
  };

  useEffect(() => {
    const pageDetails = { pageNo: currentPage, pageSize: pageSize };
    dispatch(getSubAdminListAction(pageDetails));
  }, [dispatch, currentPage, pageSize]);

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const filteredSubadminList = subadminList.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.email.toLowerCase().includes(searchItem.toLowerCase())
  );

  const totalRecords = filteredSubadminList.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const records = filteredSubadminList.slice(firstIndex, lastIndex);

  const handleDeleteSubAdmin = (userId) => {
    dispatch(deleteSubadminAction(userId)).then(() => {
      const pageDetails = { pageNo: currentPage, pageSize: pageSize };
      dispatch(getSubAdminListAction(pageDetails));
    });
  };

  const handleToggleChange = (subadmin) => {
    const details = {
      userId: subadmin.userId,
      adminPageStatus: !subadmin.adminPageStaus,
    };
    dispatch(changeSubadminActiveStatusAction(details)).then(() => {
      const pageDetails = { pageNo: currentPage, pageSize: pageSize };
      dispatch(getSubAdminListAction(pageDetails));
    });
  };

  const handlePageSizeChange = (value) => {
    setPageSize(Number(value));
    setCurrentPage(1); // Reset to first page when changing page size
    setSelectKey(prevKey => prevKey + 1); // Force re-render of Select
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-full w-[95%]">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-end gap-8 md:flex-row md:items-center">
            <div className="flex w-full shrink-0 gap-2 md:w-max mt-2">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  onChange={handleSearch}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-auto px-0">
          {subadminListLoadinErrorMsg && <div>Error While Loading Data</div>}
          {subadminList && (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th key={index} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((item, index) => {
                  const isLast = index === records.length - 1;
                  const classes = isLast
                    ? "px-4 py-[0.05rem]"
                    : "px-4 py-[0.05rem] border-b border-blue-gray-50";

                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {firstIndex + index + 1}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.empId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Switch
                          id="custom-switch-component"
                          ripple={false}
                          className="h-full w-full checked:bg-[#03c04a]"
                          checked={item.adminPageStaus}
                          onChange={() => handleToggleChange(item)}
                          containerProps={{ className: "w-9 h-5" }}
                          circleProps={{ className: "before:hidden left-0.5 border-none h-4 w-4" }}
                        />
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <Link to={`/layout/edit_subadmin/${item.userId}`}>
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4 text-[#003285]" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete User">
                          <IconButton variant="text">
                            <FaTrashCan
                              className="text-xl text-red-800"
                              onClick={() => handleDeleteSubAdmin(item.userId)}
                            />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>

        <CardFooter className="flex justify-between items-center border-t border-blue-gray-50 p-4 mt-1">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {t.showingPage} {currentPage} {t.of} {Math.ceil(totalRecords / pageSize)}
          </Typography>
          
          <div className="flex items-center gap-4">
            <div className="w-18 h-8 flex items-center justify-center rounded-[25px] border border-black">
              <Select
                key={selectKey}
                value={pageSize.toString()}
                onChange={handlePageSizeChange}
                containerProps={{
                  className: "min-w-[64px] h-full",
                }}
                className="w-full h-full text-sm border-0"
                labelProps={{
                  className: "hidden",
                }}
                menuProps={{
                  className: "z-50 border border-blue-gray-50",
                }}
              >
                {[5, 10, 15, 20, 25].map((size) => (
                  <Option key={size} value={size.toString()} className="py-1 text-sm">
                    {size}
                  </Option>
                ))}
              </Select>
            </div>
            
            <Button
              size="sm"
              variant="outlined"
              disabled={currentPage === 1}
              className="rounded-[25px] border border-black"
              onClick={handlePreviousPage}
            >
              {t.previous}
            </Button>
            
            <Button
              size="sm"
              variant="outlined"
              disabled={currentPage === totalPages}
              className="rounded-[25px] border border-black"
              onClick={handleNextPage}
            >
              {t.next}
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default SubAdminList;