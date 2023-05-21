import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUserEmail } from '../../redux/userSlice'
import { serverTimestamp,collection, addDoc } from "firebase/firestore";

function DocumentSection() {
    const userEmail = useSelector(selectUserEmail);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = () => setOpen(!open);

    
    const createDocument = async() =>{
      if(!input) return;
        await addDoc(collection(db, "userDocs", userEmail, 'docs'), {
            fileName: input,
            timestamp: serverTimestamp()
        });
        setInput('')
        setOpen(!open);
    }
  return (
    <section className="bg-[#f1f3f4] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between py-6">
                <h2 className="text-gray-700 text-lg font-medium">Start a new document</h2>
                <FontAwesomeIcon icon={faEllipsisVertical} className='cursor-pointer text-gray-700'/>
            </div>
            <div>
                <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-600" onClick={handleOpen}>
                    <img src='https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png' alt='logo' />
                </div>
                <p className='font-medium ml-2 mt-2 text-sm text-gray-700'>Blank</p>
            </div>
        </div>
        <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Create a new document</DialogHeader>
        <DialogBody divider>
            <input className='flex-grow p-2 w-full text-base bg-transparent outline-none' value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Enter name of document..." onKeyDown={e => e.key === "Enter" && createDocument()}/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={createDocument}>
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  )
}

export default DocumentSection