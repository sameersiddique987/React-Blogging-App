import React from 'react'
import { useForm } from 'react-hook-form';

import { signUpUser, uploadImage } from '../firebase/firebaseMethords';
import { Link, useNavigate } from 'react-router-dom';
const Signup =  () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
const formValue = async (data) => {
  console.log(data);

  const UserProfileImage = await uploadImage(data.file[0] , data.email)
  console.log(UserProfileImage);
  
  try {
    const userData = await signUpUser({
    FirstName : data.FirstName,
    LastName : data.LastName ,
    email : data.email ,
    password : data.password ,
    file : UserProfileImage
    })
    console.log(userData);
    navigate("/Login")
  }  catch (error) {
    console.error(error);

  }

}


  return (
    <div>
      <div>

      <h1 className=' pl-3 py-5 text-4xl font-bold'>Signup</h1>
      </div>
      
<div className='bg-[#F9FAFB]  '>
  <div className='py-10'>
<form  onSubmit={handleSubmit(formValue)} className=" t-5 bg-white max-w-sm mx-auto border border-none shadow-lg text-center rounded p-10">
<div className="mb-5">
  
  <input   {...register("FirstName", { required: true })}  type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="First Name" />
</div>
<div className="mb-5">
  
  <input  {...register("LastName", { required: true })} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Last Name" required />
</div>
  <div className="mb-5">
  
    <input  {...register("email", { required: true })}  type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Email" required />
  </div>
  <div className="mb-5">
   
    <input  {...register("password", { required: true })}  placeholder='Password' type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <div className="mb-5">
    

 
  <input {...register("file", { required: true })}   className="block w-full text-lg text-gray-900  border-[rgb(74,222,128)] rounded-lg cursor-pointer  dark:text-[rgb(74,222,128)] focus:outline-none bg-[rgb(74,222,128)] dark:border-[rgb(74,222,128)] dark:placeholder-[rgb(74,222,128)]" id="large_size" type="file" />


  </div>

  <button  type="submit" className="text-white  bg-gradient-to-r from-lime-200 bg-[rgb(74,222,128)] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</button>
<br />
<Link to="/Login">Please Login!</Link>
</form>
</div>
    </div>
</div>
  )
}

export default Signup