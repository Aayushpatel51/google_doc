import React,{useState, useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { db } from '../../firebase'
import { setDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { selectUserEmail } from '../../redux/userSlice'
import { useSelector } from 'react-redux'
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

function TextEditor() {
    const params = useParams();
    const userEmail = useSelector(selectUserEmail);
    const[editorState, setEditorState] = useState(EditorState.createEmpty())
    
    const onEditorStateChange = (editorState) =>{
        setEditorState(editorState)
        setDoc(doc(db, "userDocs", userEmail, 'docs', params.id),{
            editorState: convertToRaw(editorState.getCurrentContent()),
        },{
            merge: true,
        })
    }

    const reference = doc(db, "userDocs", userEmail, 'docs', params.id)
    const [snapshot] = useDocumentOnce(reference);
    console.log(snapshot?.data()?.editorState)
    useEffect(() => {
        if(snapshot?.data()?.editorState){
            const rawContentState = snapshot?.data()?.editorState;
            const contentState = convertFromRaw(rawContentState);
            const content = EditorState.createWithContent(contentState);
            setEditorState(content)
        }
    }, [snapshot]);

  return (
    <div className="bg-[#f1f3f4] min-h-screen pb-16">
        <Editor 
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName='flex !justify-center mx-auto'
            editorClassName='mt-6 bg-white shadow-md max-w-5xl mx-auto mv-12 p-10 border'
        />
    </div>
  )
}

export default TextEditor