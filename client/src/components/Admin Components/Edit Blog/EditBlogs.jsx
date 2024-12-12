import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { authActions } from '../../../Store/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditBlogs = () => {
    const backendLink = useSelector((state) => state.prod.link); // Link to the backend
    const [data, setData] = useState([]); // Initialize as empty array instead of undefined
    const dispatch = useDispatch(); // To dispatch actions

    // Check for token in localStorage on initial load
    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const res = await axios.get(`${backendLink}/api/v1/fetchAllBlogs`, {
                    withCredentials: true, // Add this to send cookies with the request if necessary
                });
                setData(res.data.data); // Access the 'data' key from the response
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };

        fetchAuthStatus(); // Call the fetchAuthStatus function
    }, [backendLink]); // Dependency array only includes backendLink

    // Function to delete a blog
    const deleteBlog = async (id) => {
        try {
            // Remove token from localStorage before making the request
        
            const res = await axios.put(`${backendLink}/api/v1/deleteBlog/${id}`,{}, {
                withCredentials: true, // Send cookies if required by the server
            });

            // If deletion is successful, update the state
            setData((prevData) => prevData.filter((item) => item._id !== id));
            toast.success('Blog deleted successfully!');
            console.log(res.data.message); // Log the success message from the backend
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error('Failed to delete blog.');
        }
    };

    return (
        <div className='p-4 min-h-screen'>
            <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog</h1>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 my-4">
                {data &&
                    data.map((items, i) => (
                        <div key={i} className='bg-white rounded-xl p-4 flex flex-col items-center'>
                            {/* Responsive image container */}
                            <div className='w-full sm:w-4/6'>
                                <img src={items.image} alt='' className='rounded object-cover' />
                            </div>
                            <div className='mt-4 text-center'>
                                <h1 className='text-lg sm:text-2xl font-semibold'>{items.title}</h1>
                                <p className='mb-4 text-sm sm:text-base'>{items.description.slice(0, 170)}...</p>
                            </div>

                            {/* Buttons with full width on mobile */}
                            <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-4'>
                                <Link to={`/Admin-DashBoard/update-blogs/${items._id}`}
                                    className='bg-blue-600 text-center w-full sm:w-[48%] text-white rounded px-4 py-2'>
                                    Edit
                                </Link>
                                <button className='bg-red-600 w-full sm:w-[48%] text-center text-white rounded px-4 py-2'
                                    onClick={() => deleteBlog(items._id)}>
                                    DELETE
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default EditBlogs;
