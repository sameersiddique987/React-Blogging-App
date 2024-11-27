

import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseMethords";


const Profile = () => {


  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
            const q = query(collection(db, "users"), where("id", "==", user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                setBlogData(doc.data())
            });
            console.log(user);

        } catch (error) {
            console.log(error);
        }
    } else {
        console.log('user logout ho giya ha');
    }
      
    })
  }, [])
  return (
<>
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex items-center space-x-6">
      <img
        className="w-48 h-48 object-cover object-center border-2 border-black rounded-full"
        alt="profile"
        src={blogData.file || 'https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg'}
      />
      <div>
        <h1 className="title-font text-xl font-medium text-gray-900">
          Name : {blogData.FirstName}
        </h1>
        <h1 className="title-font text-xl font-medium text-gray-900">
          Email : {blogData.email}
        </h1>
      </div>
    </div>
  </div>
</>


  )
}

export default Profile