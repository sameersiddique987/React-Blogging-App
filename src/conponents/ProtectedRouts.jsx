import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase/firebaseMethords'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRouts({component}) {
    const [isUser , setisUser ] = useState(false)
   
    const navigate = useNavigate()
   useEffect(() => {
    onAuthStateChanged(auth , (user) => {
    if(user){
        setisUser(true)
        return
    } 
    navigate('/login')
    }) 
   },[])
  return (
    setisUser ? component : <h1>Loading...</h1>
  )
}

export default ProtectedRouts