import React from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";

const ImageDialog = ({openDialogBox, setopenDialogBox,urls}) => {
  return (
    <Dialog
      open={openDialogBox}
      handler={() => setopenDialogBox(!openDialogBox)}
      className="h-[80%] flex flex-col items-center justify-center"
    >
      <DialogBody
        className={`h-[90%] rounded-md ${
          openDialogBox ? "block" : "hidden"
        } flex items-center justify-center flex-col `}
      >
        <div className="h-full w-full">
         <img className="h-[25rem]" src={urls} alt="image"/>
        </div>
      </DialogBody>
      <Button
        variant="text"
        color="black"
        onClick={() => setopenDialogBox(!openDialogBox)}
        className="mt-2"
      >
        <span>close</span>
      </Button>
    </Dialog>
  );
};

export default ImageDialog;
