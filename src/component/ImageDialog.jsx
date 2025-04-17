// import React, { useEffect } from "react";
// import { Dialog, DialogBody, Button } from "@material-tailwind/react";

// const ImageDialog = ({openDialogBox, setopenDialogBox,urls}) => {
//   useEffect(()=>{
//     console.log(urls)
//   })
//   return (
//     <Dialog
//       open={openDialogBox}
//       handler={() => setopenDialogBox(!openDialogBox)}
//       className="h-[80%] flex flex-col items-center justify-center"
//     >
//       <DialogBody
//         className={`h-[90%] rounded-md ${
//           openDialogBox ? "block" : "hidden"
//         } flex items-center justify-center flex-col `}
//       >
//         <div className="h-full w-full">
//          <img className="h-[25rem]" src={urls} alt="image"/>
//         </div>
//       </DialogBody>
//       <Button
//         variant="text"
//         color="black"
//         onClick={() => setopenDialogBox(!openDialogBox)}
//         className="mt-2"
//       >
//         <span>close</span>
//       </Button>
//     </Dialog>
//   );
// };

// export default ImageDialog;





import React, { useState, useEffect } from "react";

const ImageDialog = ({ openDialogBox, setopenDialogBox, urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    console.log(urls);
  }, [urls]);

  // Convert single string to array if needed
  const imageUrls = Array.isArray(urls) ? urls : [urls];

  // Handle next and previous navigation
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  if (!openDialogBox) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative bg-blue-gray-50 rounded-3xl shadow-xl w-4/5 max-w-xl h-4/5 flex flex-col ">
        {/* Dialog Body */}
        <div className="flex-1 p-2 overflow-hidden">
          {imageUrls && imageUrls.length > 0 ? (
            <div className="h-full w-full relative">
              <div className="h-full flex items-center justify-center">
                <img 
                  className="h-96 max-h-full object-contain" 
                  src={imageUrls[currentIndex]} 
                  alt={`image-${currentIndex}`}
                />
              </div>
              
              {/* Carousel Controls */}
              {imageUrls.length > 1 && (
                <>
                  <div className="absolute inset-0 flex items-center justify-between">
                    <button 
                      onClick={prevImage} 
                      className="ml-2 rounded-full bg-black bg-opacity-30 text-white h-12 w-12 flex items-center justify-center"
                    >
                      &lt;
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="mr-2 rounded-full bg-black bg-opacity-30 text-white h-12 w-12 flex items-center justify-center"
                    >
                      &gt;
                    </button>
                  </div>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {imageUrls.map((_, index) => (
                      <span 
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full cursor-pointer ${
                          currentIndex === index ? "bg-blue-500" : "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="text-center">No images to display</p>
          )}
        </div>

        {/* Dialog Footer */}
        <div className="p-4 flex justify-center">
          <button
            onClick={() => setopenDialogBox(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-extrabold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageDialog;
