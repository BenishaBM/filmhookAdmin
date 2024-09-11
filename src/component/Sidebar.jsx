import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import { RiAdminFill } from "react-icons/ri";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import flimhookLogo from "../assets/logo/flimhookLogo.png";
import { GoReport } from "react-icons/go";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/slices/loginSlice";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);
  const [userType, setUserType] = useState(null);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  return (
    <div className="h-screen w-[20%] max-w-[20rem] bg-gray-100">
      <div className="mb-2 p-4">
        <img src={flimhookLogo} alt="" />
      </div>
      <List>
        {userType === "SuperAdmin" && (
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <Link to="/layout">
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <RiAdminFill className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Admin Panel
                  </Typography>
                </AccordionHeader>
              </ListItem>
            </Link>

            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/layout/create_subadmin">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Create SubAdmin
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        )}
        <Link to="/layout/industrial_user">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Industrial User
          </ListItem>
        </Link>
        <Link to="/layout/report">
          <ListItem>
            <ListItemPrefix>
              <GoReport className="h-5 w-5" />
            </ListItemPrefix>
            Report
          </ListItem>
        </Link>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </div>
  );
}
