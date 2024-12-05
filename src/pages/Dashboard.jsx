
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { db, auth, sendData } from '../firebase/firebaseMethords';
import { onAuthStateChanged } from 'firebase/auth';
import { query, collection, serverTimestamp, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';

function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [users, setusers] = useState([]);
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userQuery = query(collection(db, 'users'), where('id', '==', user.uid));
          const userSnapshot = await getDocs(userQuery);
          const usersArray = [];
          userSnapshot.forEach((doc) => {
            usersArray.push(doc.data());
          });
          setusers(usersArray);

          const blogQuery = query(collection(db, 'blogs'), where('uid', '==', user.uid));
          const blogSnapshot = await getDocs(blogQuery);
          const blogsArray = [];
          blogSnapshot.forEach((doc) => {
            blogsArray.push(doc.data());
          });
          setblogs(blogsArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    });
  }, []);

  const sendDatafirestore = async (data) => {
    try {
      const response = await sendData(
        {
          title: data.title,
          description: data.description,
          uid: auth.currentUser.uid,
          pfp: users[0]?.file || '',
          createdAt: serverTimestamp(),
        },
        'blogs'
      );
      const newBlog = {
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
        file: users[0]?.file || '',
        createdAt: new Date(),
      };

      Swal.fire({
        title: 'Success!',
        text: 'Your Blog Post Successfully',
        icon: 'success',
        confirmButtonColor: '#234e94',
        confirmButtonText: 'Post',
      });
      setblogs((prevBlogs) => [...prevBlogs, newBlog]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="py-5 px-3 text-center sm:text-left">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>

      <div className="container mx-auto p-3">
        <form
          onSubmit={handleSubmit(sendDatafirestore)}
          className="bg-white rounded shadow-lg p-6 max-w-xl mx-auto"
        >
          <div className="mb-5">
            <input
              {...register('title', { required: true })}
              placeholder="Enter Your Title"
              type="text"
              className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            />
            {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}
          </div>

          <div className="mb-5">
            <textarea
              {...register('description', { required: true })}
              rows="4"
              className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5"
              placeholder="Write your thoughts here..."
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5"
          >
            Publish Blog
          </button>
        </form>

        <h2 className="text-4xl font-medium mt-8 ">My Blogs</h2>
        <div className="mt-5">
          {blogs.length > 0 ? (
            blogs.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded p-5 mb-4 max-w-xl mx-auto"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))
          ) : ( <div className='flex justify-center items-center text-2xl'>Blog not found</div>
           
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
