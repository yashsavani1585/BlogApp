import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { authActions } from '../../Store/authSlice';
import AllBlogsComponents from '../../components/AllBlogs/AllBlogsComponents';

const AllBlogs = () => {
  const backendLink = useSelector((state) => state.prod.link); // Link to the backend
  const [data, setData] = useState([]); // Initialize as empty array instead of undefined
  // const dispatch = useDispatch(); // To dispatch actions

  // Check for token in localStorage on initial load
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // If token is present in localStorage, dispatch the loginSuccess action
  //     dispatch(authActions.loginSuccess({ token }));
  //   }
  // }, [dispatch]);

  // Function to fetch all blogs after checking authentication status
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
         
          const res = await axios.get(`${backendLink}/api/v1/fetchAllBlogs`, {
            withCredentials:true,
          });
          // Fix: Correctly access the blogs data from the response
          setData(res.data.data); // Access the 'data' key from the response
        
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchAuthStatus(); // Call the fetchAuthStatus function
  }, [backendLink]); // Dependency array only includes backendLink

  return (
    <div className='mb-4 py-4'>
      {data && data.length > 0 ? (
        <>
          <h1 className='text-xl font-semibold mb-4'></h1>
          <AllBlogsComponents data={data} />
        </>
      ) : (
        <p>No blogs available</p> // Display message if there are no blogs
      )}
    </div>
  );
};

export default AllBlogs;
