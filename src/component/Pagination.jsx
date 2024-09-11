import React from 'react';
import { CardFooter, Button,  IconButton } from "@material-tailwind/react";
import { GrPrevious ,GrNext} from "react-icons/gr";

const Pagination = ({pagenumbers,currentPage,totalPages,handlePageClicked }) => {
  return (
    <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
    <Button
      variant="outlined"
      size="sm"
      onClick={() => handlePageClicked(currentPage - 1)}
      disabled={currentPage === 1}
      className=" mr-3"
    >
      <GrPrevious/>
    </Button>
    <div className="flex items-center gap-2">
      {pagenumbers().map((n, i) => (
        <IconButton
          key={i}
          variant={n === currentPage ? "outlined" : "text"}
          size="sm"
          onClick={() => typeof n === 'number' && handlePageClicked(n)}
          disabled={n === '...'}
          className={n === '...' ? ' text-3xl flex items-center justify-center' : ''}
        >
          {n}
        </IconButton>
      ))}
    </div>
    <Button
      variant="outlined"
      size="sm"
      onClick={() => handlePageClicked(currentPage + 1)}
      disabled={currentPage === totalPages}
      className=" ml-3"
    >
     <GrNext/>
    </Button>
  </CardFooter>
  )
}

export default Pagination