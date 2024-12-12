// import React from 'react'
// import { Link } from 'react-router-dom'

// const SideBar = () => {
//     const SideBarLinks = [
//         {
//             name:"Dashboard",
//             to:"/profile",
//         },
//         {
//             name:"Favourites",
//             to:"/profile/favourites",
//         },
//         {
//             name:"Liked Blogs",
//             to:"/profile/liked-blogs",
//         },
//     ]
//   return (
//     <div className='w-[100%] border-r flex flex-col gap-4 pr-4 '>
//         {
//             SideBarLinks.map((items,i)=>(
//                 <Link to={items.to} className="hover:font-semibold" key={i}>{items.name}</Link>
//             ))
//         }
//         <button className='bg-zinc-900 text-white rounded w-[100%] py-2 hover:bg-blue-600 transition-all duration-300 text-center'>

//             Logout</button>
//     </div>
//   )
// }

// export default SideBar

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../../Store/authSlice'; // Correct import of authAction
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate for redirection
    const backendLink = useSelector((state) => state.prod.link); // Get backend URL from Redux

    const LogoutHandler = async () => {
        try {
            // Make the logout API request
            const response = await axios.post(`${backendLink}/api/v1/logout`, {}, { withCredentials: true });

            // Dispatch logout action to Redux store
            dispatch(authActions.logoutSuccess()); // Correct dispatch method

            if (response.status === 200) {
                // Optionally, show a success message or log to the console
                console.log('Logout successful');
                // Redirect user to login page
                navigate('/');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const SideBarLinks = [
        {
            name: "Dashboard",
            to: "/profile",
        },
        {
            name: "Favourites",
            to: "/profile/favourites",
        },
       
    ];

    return (
        <div className='w-[100%] border-r flex flex-col gap-4 pr-4'>
            {SideBarLinks.map((items, i) => (
                <Link to={items.to} className="hover:font-semibold" key={i}>
                    {items.name}
                </Link>
            ))}
            <button
                onClick={LogoutHandler} // Trigger logout on button click
                className='bg-zinc-900 text-white rounded w-[100%] py-2 hover:bg-blue-600 transition-all duration-300 text-center'
            >
                Logout
            </button>
        </div>
    );
};

export default SideBar;
