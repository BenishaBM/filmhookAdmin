import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const ReportPost = () => {
  const { reportPostFiles, reportPostUsers } = useSelector(
    (state) => state.reportPost
  );

  console.log("report post", reportPostFiles);
  console.log("report user", reportPostUsers);

  const TABLE_HEAD = ["User ID", "Reported by", "Total Reported Posts"];

  return (
    <div className="flex items-center justify-center h-full w-full pr-6">
      <div className=" h-full w-[70%] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  overflow-y-auto p-4">
        {reportPostFiles.map((post, index) => (
          <div key={index}>
            <img
              className="h-40 w-full max-w-full rounded-lg object-cover object-center"
              src={post.filePath}
              alt="post-photo"
            />
          </div>
        ))}
      </div>
      <div className="w-[30%] h-full py-4 ">
        {reportPostUsers && (
          <table className="w-full min-w-max table-auto text-left rounded border overflow-y-auto">
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
              {reportPostUsers.map((item, index) => {
                const isLast = index === reportPostUsers.length - 1;
                const classes = isLast
                  ? "px-4 py-[0.5rem]"
                  : "px-4 py-[0.5rem] border-b border-blue-gray-50";
                return (
                  <tr
                    key={index}
                    className="even:bg-blue-gray-50/50 text-center"
                  >
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {item.userId}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.username}
                      </Typography>
                    </td>
                    <td className={classes}>{item.reportCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportPost;
