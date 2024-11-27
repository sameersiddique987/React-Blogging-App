import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { db, auth, signOutUser } from "../firebase/firebaseMethords";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const Navbar = () => {
  let navigate = useNavigate();
  const currentPage = useLocation();
  const [Data, setData] = useState([]);
  

  // Logout user
  const userLogout = () => {
    Swal.fire({
      title: "Success!",
      text: "You are logged out successfully",
      icon: "success",
      confirmButtonText: "Logout",
      confirmButtonColor: "#234e94",
    });
    signOutUser();
     setData([]);
    navigate("/login");
  };

  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(collection(db, "users"), where("id", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const userDataArray = []; // Temporary array to store user data
  
          querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            userDataArray.push(doc.data());
          });
        
          // Update Data state
          if (userDataArray.length > 0) {
            setData(userDataArray);
          }
          console.log(user);
        } catch (error) {
          console.log(error);
        }
      }
    });
    return () => unsubscribe(); // Clean up subscription
  }, []);
  return (
    <nav className="navbar bg-blue-700 text-white px-4 shadow-lg">
      {/* Left Section: Branding */}
      <div className="flex items-center">
        <a className="text-xl font-bold cursor-pointer">Blogging App</a>
      </div>

      {/* Right Section: Profile & Dropdown */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar focus:outline-none"
          >
            <div className="w-10 rounded-full">
              <img
                alt="profile"
                src={
                  Data.length > 0 && Data[0].file
                    ? Data[0].file
                    : "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
                }
              />
            </div>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52"
          >
            {auth.currentUser ? (
              <>
                {currentPage.pathname !== "/" && (
                  <li>
                    <Link to="/">Allblogs</Link>
                  </li>
                )}
                {currentPage.pathname !== "/Profile" && (
                  <li>
                    <Link to="Profile">Profile</Link>
                  </li>
                )}
                {currentPage.pathname !== "/Dashboard" && (
                  <li>
                    <Link to="Dashboard">Dashboard</Link>
                  </li>
                )}
                <li>
                  <button onClick={userLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="Login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
