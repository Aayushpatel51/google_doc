import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines,faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase'
import { selectUserEmail } from '../../redux/userSlice'
import { doc } from "firebase/firestore";
import { useSelector } from 'react-redux'
import { Button } from "@material-tailwind/react";

function DocHeader() {
    const navigate = useNavigate();
    const userEmail = useSelector(selectUserEmail);
    const userPhoto = useSelector((state) => state.user.photo)
    const handleClick = () => {
        navigate('/');
    }
    const params = useParams();
    const reference = doc(db, "userDocs", userEmail, 'docs', params.id)
    const [snapshot] = useDocumentOnce(reference);
  return (
    <header className="flex justify-between items-center p-3 pb-1 sticky backdrop-blur-md top-0 z-50 px-4 py-2 shadow-sm">
        <span onClick={handleClick} className="cursor-pointer"> 
            <FontAwesomeIcon icon={faFileLines} className='text-blue-600 text-5xl'/>
        </span>
        <div className='flex-grow px-2'>
            <h2>{snapshot?.data()?.fileName}</h2>
            <div className='flex items-center text-sm space-x-2 ml-1 h-8 text-gray-600'>
                <p className='option'>File</p>
                <p className='option'>Edit</p>
                <p className='option'>View</p>
                <p className='option'>Insert</p>
                <p className='option'>Format</p>
                <p className='option'>Tools</p>
            </div>
        </div>
        <Button color="blue" className="hidden md:inline-flex h-10 items-center">
            <FontAwesomeIcon icon={faShareNodes} className='mr-2'/>  Share
        </Button>
        <img loading='lazy' className='cursor-pointer h-12 w-12 rounded-full ml-2' src={userPhoto} alt='' />    
    </header>
  )
}

export default DocHeader