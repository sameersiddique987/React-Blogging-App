

import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import {db, auth, sendData } from '../firebase/firebaseMethords';
import { onAuthStateChanged } from 'firebase/auth';
import {   query, collection, serverTimestamp, where, getDocs } from "firebase/firestore"; 
import Swal from 'sweetalert2';
function Dashboard() {
  
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [users, setusers] = useState([]);
  const [blogs, setblogs] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
         users.push(doc.data())
        });
        setusers(users)
        console.log(users)

    //  get data from firebase
     
       const b = query(collection(db, "blogs"), where("uid", "==", user.uid));
        const datablog = await getDocs(b);
        datablog.forEach((doc) => {
         blogs.push(doc.data())
        });
        setblogs([...blogs])
        console.log(blogs) 
      }   
    })


  }, [])
  console.log(blogs)


const sendDatafirestore= async (data) => {
  console.log(data)
  try {
    const response = await sendData({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid,
      pfp: users[0].file,
      createdAt: serverTimestamp()  
    }, 'blogs')
    const newblog ={
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid,
      file: users[0].file,
      createdAt: new Date()  
    }

    Swal.fire({
      title: 'Success!',
      text: 'Your Blog Post Successfully',
      icon: 'Success',
      confirmButtonColor: '#234e94',
      confirmButtonText: 'Post'
    })
    setblogs((prevBlogs) => [...prevBlogs, newblog]); // Update state
    console.log(response);

  } catch (error) {
    console.error(error)
  }
  reset()

  };
  
  





 

  





  
  return (
    <div>
    <div>

    <h1 className=' pl-3 py-5 text-4xl font-bold'>Dashboard</h1>
    </div>
    
<div className='bg-[#F9FAFB]  '>
<div  className='pb-32 pt-5 '>
<form  onSubmit={handleSubmit(sendDatafirestore)}   className="  t-5 bg-white px-10 mx-44 border border-none shadow-lg  rounded p-10">


<div className="mb-5">
  
  <input  {...register("title", { required: true })}    placeholder='Enter Your Value' type="text" id="password" className=" w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
</div>

<div className='mb-5'>
 

<textarea  {...register("description", { required: true })}     id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

</div>

<button type="submit" className="text-white  bg-gradient-to-r from-lime-200 bg-[#4ade80] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Publish blogs</button>

</form>
<h1 className='pl-44 py-5 font-medium text-2xl'>My Blogs</h1>
 {
  blogs.length > 0 ? blogs.map((item , index) => {
    return <div key={index}>
   <div className=" card  t-5 bg-white px-10 mx-44 border border-none  py-5 my-5  rounded p-10">
   <h1>{item.title}</h1>
   <h5>{item.description} </h5>
   {/* <div>
   
   <button onClick={() => deletebtn(index , item.id)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Delete</button>
   <button onClick={() => editbtn(index)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-6 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit</button>
   </div> */}


  </div>
   </div>
    
  }) : <div className='text-center flex justify-center'>
    
<div role="status">
    <svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

  </div>
  
  
 }
</div>
  </div>
  
</div>
  )
}

export default Dashboard