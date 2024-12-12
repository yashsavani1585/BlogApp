import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/authSlice';
import axios from 'axios';

const RecentBlogs = () => {
    

    const backendLink = useSelector((state) => state.prod.link); // Link to the backend
    const [data, setData] = useState([]); // Initialize as empty array instead of undefined
    const dispatch = useDispatch(); // To dispatch actions
  
    // Check for token in localStorage on initial load
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // If token is present in localStorage, dispatch the loginSuccess action
        dispatch(authActions.loginSuccess({ token }));
      }
    }, [dispatch]);
  
    // Function to fetch all blogs after checking authentication status
    useEffect(() => {
      const fetchAuthStatus = async () => {
        try {
          const token = localStorage.getItem('token'); // Get the token from localStorage
          if (token) {
            const res = await axios.get(`${backendLink}/api/v1/fetchRecentBlog`, {
              headers: {
                Authorization: `Bearer ${token}`, // Send token in Authorization header
              },
            });
            // Fix: Correctly access the blogs data from the response
            setData(res.data.data); // Access the 'data' key from the response
          }
        } catch (err) {
          console.error("Error fetching blogs:", err);
        }
      };
  
      fetchAuthStatus(); // Call the fetchAuthStatus function
    }, [backendLink]); // Dependency array only includes backendLink
  

    return (
        <div className='mb-4 py-4'>
            <h1 className='text-xl font-semibold mb-4'>Recent Blogs</h1>
            <div className='flex flex-col gap-8 lg:gap-8'>
                {data &&
                    data.map((items, i) => (
                        <div key={i} className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
                            <BlogCard items={items} />

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecentBlogs