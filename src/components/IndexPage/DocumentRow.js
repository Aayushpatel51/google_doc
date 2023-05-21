import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function DocumentRow({id, filename, date}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/doc/${id}`);
    }

  return (
    <div onClick={handleClick} className="max-w-3xl mx-auto py-2 flex items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 text-sm">
        <FontAwesomeIcon icon={faFileLines} className='text-blue-600'/>
        <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
        <p className="pr-5 text-sm">{date?.toDate().toLocaleString()}</p>
        <Button variant="text" color='gray' className="rounded-lg">
            <FontAwesomeIcon icon={faEllipsisVertical} className='text-gray-600'/>        
        </Button>
    </div>
  )
}

export default DocumentRow