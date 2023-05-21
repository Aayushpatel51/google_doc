import React from 'react'
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFileLines, faMagnifyingGlass, faBraille} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setSignOut } from '../../redux/userSlice'
import { auth } from "../../firebase";
import {useNavigate} from 'react-router-dom';


function Header() {
//   const userPhoto = useSelector(selectUserPhoto);
  const userPhoto = useSelector((state) => state.user.photo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = () => {
      auth
        .signOut()
        .then(() => {
            dispatch(setSignOut());
            navigate('/');
        })
  };
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-sm bg-white">
        <Button variant="text" color="gray" className="hidden md:inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faBars} className='text-3xl text-gray-400' />        
        </Button>      
        <FontAwesomeIcon icon={faFileLines} className='text-3xl text-blue-400'/> 
        <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
        <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:shadow-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-xl text-gray-400'/>
            <input type="text" placeholder="Search" className='flex-grow px-5 text-base bg-transparent outline-none'/>
        </div>
        <Button variant="text" color="gray" className="hidden md:inline-flex items-center ml-5 md:ml-20 border-0">
            <FontAwesomeIcon icon={faBraille} className='text-3xl text-gray-400' />        
        </Button>  

        <img loading='lazy' className='cursor-pointer h-12 w-12 rounded-full ml-2' onClick={handleAuth} src={userPhoto} alt='' />

    </header>
  )
}   

export default Header