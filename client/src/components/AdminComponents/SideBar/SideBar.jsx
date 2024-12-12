


import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import {  useSelector } from 'react-redux';
import axios from 'axios';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Dashboard", to: "/Admin-DashBoard" },
        { name: "Add Blog", to: "/Admin-DashBoard/add-blogs" },
        { name: "Edit Blogs", to: "/Admin-DashBoard/edit-blogs" },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);
    // const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate for redirection
    const backendLink = useSelector((state) => state.prod.link); // Get backend URL from Redux

    const LogoutHandler = async () => {
        try {
            // Make the logout API request
            const response = await axios.post(`${backendLink}/api/v1/logout`, {}, { withCredentials: true });

            // Dispatch logout action to Redux store
            // dispatch(authActions.logoutSuccess()); // Correct dispatch method

            if (response.status === 200) {
                // Optionally, show a success message or log to the console
                console.log('Logout successful');
                // Redirect user to login page
                navigate('/Admin-login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <div className="relative">
            {/* Hamburger Icon for small screens */}
            {!isOpen && (
                <div className="absolute top-4 left-4 z-20 lg:hidden">
                    <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                        <FaBars />
                    </button>
                </div>
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white p-4 transition-transform duration-300 z-10 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative`}>
                
                {/* Close Icon at the top-right inside the sidebar */}
                <div className="absolute top-4 right-4 lg:hidden">
                    <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                        <FaTimes />
                    </button>
                </div>

                <h1 className="text-xl font-semibold">Admin Page</h1>
                <hr className="my-4" />
                
                {/* Links */}
                <div className="flex flex-col gap-4">
                    {links.map((item, i) => (
                        <Link
                            key={i}
                            to={item.to}
                            className="text-xl hover:scale-105 transition-all duration-300"
                            onClick={() => setIsOpen(false)} // Close sidebar on link click for mobile
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Logout Button */}
                <div>
                    <button className="mt-5 bg-black text-white px-4 py-2 w-full rounded"
                    onClick={LogoutHandler}
                    >LogOut</button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
