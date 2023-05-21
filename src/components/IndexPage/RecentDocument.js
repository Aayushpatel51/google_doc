import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUserEmail } from '../../redux/userSlice'
import { collection } from "firebase/firestore";
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import DocumentRow from './DocumentRow'

function RecentDocument() {
  const userEmail = useSelector(selectUserEmail);
  const query = collection(db, "userDocs", userEmail, 'docs')
  const [snapshot] = useCollectionOnce(query);
  return (
    <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8">
            <div className="flex items-center justify-between pb-5">
                <h2 className="text-gray-700 text-lg font-medium flex-grow">Recent document</h2>
                <p className="text-gray-700 font-medium mr-12">Date Created</p>
                <FontAwesomeIcon icon={faFolder} className='text-gray-700' />
            </div>
        </div>

        {snapshot?.docs.map(doc =>(
          <DocumentRow 
            key={doc.id}
            id={doc.id}
            filename = {doc.data().fileName}
            date = {doc.data().timestamp}
          />
        ))}
    </section>
  )
}

export default RecentDocument