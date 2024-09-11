import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPostReportAction,
  setReportPostFiles,
  setRepotUserDetails,
} from "../../redux/slices/reportPostsSlice";
import { Link } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardFooter,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Tooltip,
  Input,
  Switch,
  IconButton,
} from "@material-tailwind/react";
import Pagination from "../../component/Pagination";

const Report = () => {
  const {
    getAllpostReportLoadingStatus,
    getAllpostReportLoadingErrorMsg,
    getAllPostReportList,
  } = useSelector((state) => state.reportPost);
  const dispatch = useDispatch();

  const reportPosts = getAllPostReportList.map((report) => ({
    userDetails: report.reportUserIds,
    posts: report.postWebModel.postFiles,
    postId: report.postWebModel.id,
    description: report.postWebModel.description,
    reportCount: report.reportUserIdCount,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");


  useEffect(() => {
    const pageDetails = {
      pageNo: 1,
      pageSize: 10,
    };
    dispatch(getAllPostReportAction(pageDetails));
  }, []);

  

  const handleSearch = (e) => {
    console.log("name", e.target.value);
    setSearchName(e.target.value);
  };

  const fliterdReportPostList = reportPosts.filter(
    (post) => post.description.toLowerCase().includes(searchName.toLocaleLowerCase())
  );

  const recordsPerPage = 10;
  const totalPages = Math.ceil(
    fliterdReportPostList.length / recordsPerPage
  );
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const postRecords = fliterdReportPostList.slice(firstIndex, lastIndex);
  const handlePageClicked = (page) => {
    setCurrentPage(page);
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

  const TABLE_HEAD = ["Post Id", "Description", "Report Count", "Posts"];

  return (
    <div className="flex items-center justify-center h-full w-full ">
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
          {/* {subadminListLoadingStatus === "loading" && <div>Loading...</div>} */}
          {getAllpostReportLoadingErrorMsg && (
            <div>Error While Loading Data</div>
          )}
          {getAllPostReportList && (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                { postRecords.map((item, index) => {
                  const isLast = index ===  postRecords.length - 1;
                  const classes = isLast
                    ? "px-4 py-[0.5rem]"
                    : "px-4 py-[0.5rem] border-b border-blue-gray-50";
                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {item.postId}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.description}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.reportCount}{" "}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link
                          to={`/layout/report_post/${item.postId}`}
                          className=" text-blue-600"
                          onClick={() => {
                            dispatch(setReportPostFiles(item.posts));
                            dispatch(setRepotUserDetails(item.userDetails));
                          }}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>

        <Pagination
            pagenumbers={renderPagination}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClicked={handlePageClicked}
          />
      </div>
    </div>
  );
};

export default Report;
