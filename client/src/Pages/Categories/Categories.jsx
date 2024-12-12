import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { authActions } from '../../Store/authSlice';
import axios from 'axios';

const Categories = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const backendLink = useSelector((state) => state.prod.link); // Link to the backend
  const [data, setData] = useState([]); // Initialize as an empty array
  const dispatch = useDispatch(); // To dispatch actions

  // Check for token in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Dispatch the loginSuccess action if the token is present
      dispatch(authActions.loginSuccess({ token }));
    }
  }, [dispatch]);

  // Fetch blogs for a specific category
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && id) {
          // Ensure the category ID is included in the API URL
          const res = await axios.get(`${backendLink}/api/v1/getBlogsByCategoryID/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Update the data state with the fetched blogs
          setData(res.data.blogs || []);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, [backendLink, id]);

  return (
    <div className='flex flex-col gap-8 lg:gap-4'>
      {data &&
        data.map((items, i) => (
          <div key={i} className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
            <BlogCard items={items} />
          </div>
        ))}
    </div>
  );
};

export default Categories;
