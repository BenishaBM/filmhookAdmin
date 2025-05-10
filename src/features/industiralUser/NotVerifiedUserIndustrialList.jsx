

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnverifiedIndustrialUserListAction } from "../../redux/slices/notVerifiedIndustrialUserSlice";
import {
  MagnifyingGlassIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import Pagination from "../../component/Pagination";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
} from "@material-tailwind/react";

const NotVerifiedUserIndustrialList = () => {
  const {
    unVerifiedIndustrialUserList,
    getListLoadingStatus,
    getListErrorMessage,
  } = useSelector((state) => state.industrialUser);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const pageDetails = {
      pageNo: currentPage,
      pageSize: 10,
    };
    dispatch(getUnverifiedIndustrialUserListAction(pageDetails));
  }, [dispatch, currentPage]);

  const handlePageClicked = (page) => {
    setCurrentPage(page);
  };
  const fliterdIndustrialUserList = unVerifiedIndustrialUserList.filter(
    (user) => user.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const recordsPerPage = 10;
  const totalPages = Math.ceil(
    fliterdIndustrialUserList.length / recordsPerPage
  );
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = fliterdIndustrialUserList.slice(firstIndex, lastIndex);

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  const TABLE_HEAD = ["S.No", "Name", "Details"];

  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="h-full w-[95%]">
        <Typography
          variant="h1"
          className="text-4xl font-bold text-blue-800 text-center my-6"
        >
          Un verified Industrial User
        </Typography>


        <CardBody className="overflow-y-auto px-0">
          {getListLoadingStatus === "loading" && <div className="text-center py-4">Loading...</div>}
          {getListErrorMessage && <div className="text-center text-red-500 py-4">Error While Loading Data</div>}
          {records && (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className="bg-blue-500">
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="p-4"
                    >
                      <Typography
                        variant="small"
                        color="white"
                        className="font-semibold"
                      >
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
                    ? "px-4 py-3"
                    : "px-4 py-3 border-b border-blue-gray-50";
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {firstIndex + index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.name}
                        </Typography>
                      </td>
                      <td className={classes} >
                        <Link
                          to={`/layout/unverified_userdetails/${item.userId}`}
                          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md w-max"
                        >
                          <EyeIcon className="h-5 w-5" />
                          <span>View Details</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>

        {totalPages > 1 && (
          <div className="my-4">
            <Pagination
              pagenumbers={renderPagination}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageClicked={handlePageClicked}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default NotVerifiedUserIndustrialList;








