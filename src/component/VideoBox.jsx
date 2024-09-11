import React from 'react';
import { Avatar, Card, List, ListItem,Dialog,DialogBody,Button } from "@material-tailwind/react";

const videoBox = ({openDialogBox, setopenDialogBox,urls}) => {
  return (
    <Dialog
          open={openDialogBox}
          handler={() =>  setopenDialogBox(!openDialogBox)}
          className="h-[90%] flex flex-col items-center justify-center"
        >
          <DialogBody
            className={`h-[90%] rounded-md ${
                openDialogBox ? "block" : "hidden"
            } flex items-center justify-center flex-col `}
          >
            <div className="h-[25rem] w-full">
              <video className="h-[25rem]  "controls>
                <source src={urls} type="video/mp4" />
              </video>
            </div>
          </DialogBody>
          <Button
            variant="text"
            color="black"
            onClick={() =>  setopenDialogBox(!openDialogBox)}
            className="mt-2"
          >
            <span>close</span>
          </Button>
        </Dialog>
  )
}

export default videoBox