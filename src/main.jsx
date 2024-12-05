
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Signup from './pages/Signup.jsx'
import ProtectedRouts from './conponents/ProtectedRouts.jsx'
import Profile from './pages/Profile.jsx'
import AllBlogs from './pages/AllBlogs.jsx'

const router = createBrowserRouter ([
  {
    path : "/",
    element : <Layout />,
    children : [
      {
        path : "",
        element : <AllBlogs/>
      },
      {
        path : "Login" ,
        element : <Login />
      },
      {
        path : "Signup",
        element : <Signup />
      },
      {
        path : "profile",
        element : <ProtectedRouts component={<Profile/>} />
      },
      {
         path : "Dashboard" ,
         element : <ProtectedRouts component={<Dashboard/>} />
      },
      
      {
        path : "*",
        element : <h1>NOT FOUND</h1>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router ={router}>

</RouterProvider>


)
