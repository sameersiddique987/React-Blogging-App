import React from 'react'
import { useForm } from 'react-hook-form';
import {  loginUser } from '../firebase/firebaseMethords';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const  formValue = async (data) => {
    console.log(data);

    try {
      const userData = await loginUser({
        email : data.email ,
        password : data.password
      })
      console.log(userData);
      navigate("/")
    } catch (error) {
      console.log(error);
      
    }
  }

  



  return (
    <div>
      <div>

      <h1 className=' pl-3 py-5 text-4xl font-bold'>Login</h1>
      </div>
      
<div className='bg-[#F9FAFB]  '>
  <div className='py-32'>
<form onSubmit={handleSubmit(formValue)}  className=" t-5 bg-white max-w-sm mx-auto border border-none shadow-lg text-center rounded p-10">

  <div className="mb-5">
   
    <input  {...register("email", { required: true })}   placeholder='Email' type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
  </div>
  <div className="mb-5">
    
    <input  {...register("password", { required: true })}   placeholder=' Password' type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
  </div>

  <button type="submit" className="text-white  bg-gradient-to-r from-lime-200 bg-[#4ade80] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
 <br />

 <Link to="/Signup">Please Register First!</Link>
</form>
</div>
    </div>
</div>
  )
}

export default Login