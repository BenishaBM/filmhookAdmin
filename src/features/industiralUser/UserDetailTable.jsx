import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react'; // Assuming you are using Material Tailwind

const TABLE_HEAD = ["S.no", "Industry Name", "Platform Name", "Profession Name", "Film Count", "Net Worth", "Daily Salary"];

const UserDetailsTable = ({ records, firstIndex = 0 }) => {
  return (
    <table className="w-[95%] min-w-max table-auto text-left my-3">
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
        {records.map((item, index) => {
          const isLast = index === records.length - 1;
          const classes = isLast
            ? "px-4 py-[1rem]"
            : "px-4 py-[0.05rem] border-b border-blue-gray-50";
          return (
            <tr key={item.id} className="even:bg-blue-gray-50/50">
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {firstIndex + index + 1}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.industryName}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.platformName}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.professionName}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.filmCount}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.netWorth}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.dailySalary}
                </Typography>
              </td>
              {/* <td className={classes}>
                <Link
                  to={`/layout/unverified_userdetails/${item.userId}`}
                  className="text-blue-600"
                >
                  View
                </Link>
              </td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserDetailsTable;


