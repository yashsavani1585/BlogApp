// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'

// const Categories = () => {
//     const backendLink = useSelector((state) => state.prod.link); 
//     // const [selectedCategory, setSelectedCategory] = useState(""); 
//     const [cat, setCat] = useState([]); 

//     // const cat = [
//     //     {
//     //         name: "DSA",
//     //         to: "/cat/dsa",
//     //         bg: "bg-green-200",
//     //     },
//     //     {
//     //         name: "MERN-STACK",
//     //         to: "/cat/mern-stack",
//     //         bg: "bg-orange-200",
//     //     },
//     //     {
//     //         name: ".NET-FULL-STACK",
//     //         to: "/cat/net-full-stack",
//     //         bg: "bg-indigo-200",
//     //     },
//     //     {
//     //         name: "TRENDING TOPICS",
//     //         to: "/cat/trending-topics",
//     //         bg: "bg-red-200",
//     //     },
//     // ]
//     useEffect(() => {
//         const fetchCategories = async () => {
//           try {
//             const res = await axios.get(`${backendLink}/api/v1/getCategory`, {
//               withCredentials: true,
//             });
//             setCat(res.data.categories || []); 
//           } catch (error) {
//             console.error(error);
//             setCat([]); 
//           }
//         };
//         fetchCategories();
//       }, [backendLink]);
//     return (
//         <div className='mb-4 py-4'>
//             <h1 className='text-xl font-semibold mb-4'>Categories</h1>
//             <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
//                 { cat &&
//                     cat.map((items, i) => (<Link key={i} className={`px-4 py-2 text-center text-normal  md:text-xl font-semibold bg-green-300 rounded`} to={`/cat/items._id`} >
//                         {items.title}
//                     </Link>
//                     ))}
//             </div>
//         </div>

//     )
// }

// export default Categories

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = () => {
  const backendLink = useSelector((state) => state.prod.link); 
  const [cat, setCat] = useState([]); 
  const [error, setError] = useState(null); 

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/getCategory`, {
          withCredentials: true,
        });
        console.log("Categories Response:", res.data);
        setCat(res.data.categories || []); // Fallback to an empty array
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCat([]); 
        setError("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, [backendLink]);

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Categories</h1>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cat.length > 0 ? (
          cat.map((item) => (
            <Link
              key={item._id}
              className="px-4 py-2 text-center text-normal md:text-xl font-semibold bg-green-300 rounded"
              to={`/cat/${item._id}`}
            >
              {item.title}
            </Link>
          ))
        ) : (
          !error && (
            <div className="text-gray-500 col-span-4 text-center">
              No categories available.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Categories;
