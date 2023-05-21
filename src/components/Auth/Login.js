import React from 'react'
import { Button } from "@material-tailwind/react";
import { setUserLogin } from '../../redux/userSlice'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import logo from "../../images/logo.png"



function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAuth = () => {
          signInWithPopup( auth, provider)
          .then((result)=>{
                    let user = result.user;
                    dispatch(setUserLogin({
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL
                    }))
                    navigate('/');
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    console.log({ errorCode, errorMessage, email, credential });
                });
        
      };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
        <img 
            src={logo}
            className='h-64'
            alt=''
        />
        <Button color="blue" className="mt-10" onClick={handleAuth}>Log In</Button>
    </div>
  )
}

export default Login