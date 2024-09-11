import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnverifiedIndustrialUserDetailsAction,
  getUnverifiedProfileFilesAction,
} from "../../redux/slices/notVerifiedIndustrialUserSlice";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Avatar,
  Card,
  List,
  ListItem,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import DialogBox from "../../component/VideoBox";
import ImageDialog from "../../component/ImageDialog";
import UserDetailsTable from "./UserDetailTable";
import { approveUnverifiedInductrialUserProfile } from "../../api/industrialUser";

const UnverfiedUserDetails = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    unverifiedIndestiraluserDetails,
    getDetailsLoadingStatus,
    getDetailsErrorMessage,
    unverifiedUserFiles,
    unverifiedUserFilesLoadingStatus,
    unverifiedUserFilesErrorMessage,
  } = useSelector((state) => state.industrialUser);

  const [openDialogBox, setopenDialogBox] = useState(false);
  const [urls, seturls] = useState(null);
  const [aadharurl,setAadharurl] = useState(null)
  const [fileType, setFileType] = useState(null);
  const [openReview, setopenReview] = useState(false);
  const [review, setReview] = useState("");

  const handleOpenReviewBox = () => setopenReview(!openReview);

  useEffect(() => {
    dispatch(getUnverifiedIndustrialUserDetailsAction(userId));
    dispatch(getUnverifiedProfileFilesAction(userId));
  }, []);

  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 10) {
      setReview(value);
    } else if (value < 1) {
      setReview(1);
    } else if (value > 10) {
      setReview(10);
    }
  };

  const records = unverifiedIndestiraluserDetails.Data
    ? unverifiedIndestiraluserDetails.Data.flatMap((industry, industryIndex) =>
        (industry.platformDetails || []).flatMap((platform, platformIndex) =>
          (platform.professionDetails || []).map(
            (profession, professionIndex) => ({
              id: `${industryIndex}-${platformIndex}-${professionIndex}`,
              industryName: industry.industriesName,
              platformName: platform.platformName,
              professionName: profession.professionName,
              filmCount: platform.filmCount,
              netWorth: platform.netWorth,
              dailySalary: platform.dailySalary,
              userId: industry.iupdId, // Adjust as necessary
            })
          )
        )
      )
    : [];

  const handleAadharcardDialog = () => {
    setFileType("image");
    setopenDialogBox(!openDialogBox);
    const aadharCardFile = unverifiedUserFiles.find(
      (file) => file.category === "AadhaarCard" || "PanCard"
    );

    const aadharCardFilePath = aadharCardFile ? aadharCardFile.filePath : null;
    seturls(aadharCardFilePath);
  };

  const handleImageDialog = () => {
    setFileType("image");
    setopenDialogBox(!openDialogBox);

    const imageCardFile = unverifiedUserFiles.find(
      (file) => file.category === "Image"
    );

    const imageCardFilePath = imageCardFile ? imageCardFile.filePath : null;
    seturls(imageCardFilePath);
  };
  const handlevideoDialog = () => {
    setFileType("video");
    setopenDialogBox(!openDialogBox);
    const videoCardFile = unverifiedUserFiles.find(
      (file) => file.category === "Video"
    );

    const videoCardFilePath = videoCardFile ? videoCardFile.filePath : null;
    console.log("videoCardFilePath", videoCardFilePath);
    seturls(videoCardFilePath);
  };

  const handelRejectProfile = async() => {
    const details = {
      userId: userId,
      status: true,
      adminReview: 0,
    };
    const data = await approveUnverifiedInductrialUserProfile(details);
    if(data.message === "Success"){
      toast.error("Sorry Your Profile Rejected")
    }
    console.log("data",data.message)
  };

  const handelApproveProfile = async() => {
    const details = {
      userId: userId,
      status: false,
      adminReview: review,
    };
    const data = await approveUnverifiedInductrialUserProfile(details);
    if(data.message === "Success"){
      toast.success("Your Profile Approved")
    }
    handleOpenReviewBox();
    console.log("data",data.message)
  };


  return (
    <div className="h-full w-full flex items-center justify-start flex-col py-4">
      < ToastContainer/>
      <Avatar
        size="xxl"
        alt="avatar"
        src={unverifiedIndestiraluserDetails.profilePicturePath}
        className="border border-[#1e1ff5] shadow-xl shadow-blue-900/20 ring-4 ring-blue-[#1e1ff5]"
      />
      <p className=" text-[#1e1ff5] flex items-center justify-center my-4 text-2xl">
        {unverifiedIndestiraluserDetails?.userInfo?.name}
      </p>
      <Card className="h-[2.5rem] w-[45%] flex items-center justify-center">
        <List className="flex flex-row w-full ">
          <ListItem className = "h-[2.3rem]" onClick={handleAadharcardDialog}>
            Aadhar Card / Pancard
          </ListItem>
          <ListItem className = "h-[2.3rem]" onClick={handleImageDialog}>Project Image </ListItem>
          <ListItem className = "h-[2.3rem]" onClick={handlevideoDialog}>Project Video </ListItem>
        </List>
      </Card>
      <div className="flex my-3">
        <Button
          onClick={handleOpenReviewBox}
          className="mr-3 bg-green-500 hover:bg-green-700"
        >
          Approve
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700"
          onClick={handelRejectProfile}
        >
          Reject
        </Button>
      </div>
      {fileType === "video" && (
        <DialogBox
          openDialogBox={openDialogBox}
          setopenDialogBox={setopenDialogBox}
          urls={urls}
        />
      )}
      {fileType === "image" && (
        <ImageDialog
          openDialogBox={openDialogBox}
          setopenDialogBox={setopenDialogBox}
          urls={urls}
        />
      )}

      <Dialog
        open={openReview}
        handler={handleOpenReviewBox}
        className=" w-[50%]"
      >
        <DialogBody className=" w-full flex items-center justify-center">
          <div className=" w-[40%] flex items-center ">
            {/* <lable className="mr-4">Review</lable> */}
            <label className="mr-4">Review</label>
            <input
              type="number"
              min="0"
              max="10"
              value={review}
              className="border w-[4rem] px-2 py-1"
              onChange={handleReviewChange}
            />
          </div>

          <Button
            variant="text"
            color="red"
            onClick={handleOpenReviewBox}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handelApproveProfile}
          >
            <span>Confirm</span>
          </Button>
        </DialogBody>
      </Dialog>

      <UserDetailsTable records={records} />
    </div>
  );
};

export default UnverfiedUserDetails;
