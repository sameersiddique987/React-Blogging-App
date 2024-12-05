import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Greeting from "../conponents/Greeting";
import { db } from "../firebase/firebaseMethords";

const AllBlogs = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const alldata = async () => {
      const blogsQuery = query(
        collection(db, "blogs"),
        orderBy("createdAt", "asc")
      );
      const querySnapshot = await getDocs(blogsQuery);

      querySnapshot.forEach((doc) => {
        blogData.push(doc.data());
      });

      console.log(blogData);
      setBlogData([...blogData]);
    };
    alldata();
  }, []);

  const formatDate = (timestamp) => {
    if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        time: "numeric",
      });
    }
    return "";
  };

  return (
    <>
      <div className="bg-blue-50 h-[full] p-4">
        <div className="bg-white text-black navbar p-4">
          <h1 className="font-bold text-xl">
            <Greeting />
          </h1>
        </div>

        <h1 className="font-bold text-xl m-3">All Blogs</h1>
        <div className="bg-white h-full pb-8  overflow-auto">
          {blogData.length > 0 ? (
            blogData.map((item, index) => (
              <div key={index} className="flex ml-5 mt-2">
                {/* Blog Image */}
                <div className="w-[80px] h-[80px] mt-5 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={item.pfp}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-3 mt-7">
                  <div className="flex items-center">
                    <div className="m-3">
                      <h1 className="font-bold">{item.title}</h1>
                      <p className="text-black text-sm">
                        {item.FirstName}{" "}
                        <span>Time: {formatDate(item.createdAt)}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-600">{item.description}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="  p-5 mt-4 text-2xl">No blogs available!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
