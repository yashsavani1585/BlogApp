// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MainLayout from './Layout/MainLayout';
// import Home from './Pages/Home/Page';
// import OtherLayout from './Layout/OtherLayout';
// import Login from './Pages/Login/Login';
// import SignUp from './SignUp/SignUp';
// import Profile from './Pages/Profile/Profile';
// import AllBlogs from './Pages/All Blogs/Page';
// import DashBoardProfile from './components/Profile/DashBoardProfile';
// import Favourites from './components/Profile/Favourites';
// import LikedBlogs from './components/Profile/LikedBlogs';
// import Description from './Pages/Description/Description';
// import Categories from './Pages/Categories/Categories';
// import AdminLogin from './Pages/AdminLogin/AdminLogin';
// import AdmindashBoard from './Pages/AdminDashBoard/AdmindashBoard';
// import AdminDashboard from './components/Admin Components/DashBoard/AdminDashboard';
// import AddBlogs from './components/Admin Components/Add Blog/AddBlogs';
// import EditBlogs from './components/Admin Components/Edit Blog/EditBlogs';
// import UpdateBlog from './components/Admin Components/Edit Blog/compo/UpdateBlog';
// import { ToastContainer } from 'react-toastify'; // Import toast
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { authActions } from './Store/authSlice'; // Correct action import

// const App = () => {
//   const backendLink = useSelector((state) => state.prod.link); // Link to the backend
//   const dispatch = useDispatch();

//   // Check for token in localStorage on initial load
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // If token is present in localStorage, dispatch the loginSuccess action
//       dispatch(authActions.loginSuccess({ token }));
//     }
//   }, [dispatch]);

//   // Function to check authentication status on initial load
//   useEffect(() => {
//     const fetchAuthStatus = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get the token from localStorage
//         if (token) {
//           const res = await axios.get(`${backendLink}/api/v1/check-auth`, {
//             headers: {
//               Authorization: `Bearer ${token}`, // Send token in Authorization header
//             },
//           });

//           // If the backend verifies the token is valid, update the state
//           if (res.data === true) {
//             dispatch(authActions.loginSuccess({ token }));
//           }
//         }
//       } catch (error) {
//         // Handle 403 or other errors
//         if (error.response && error.response.status === 403) {
//           console.error('Token is invalid or expired, please log in again');
//           localStorage.removeItem('token');
//           dispatch(authActions.logout());
//           alert('Session expired, please log in again');
//         } else {
//           console.error('Error fetching auth status:', error);
//         }
//       }
//     };

//     fetchAuthStatus();
//   }, [backendLink, dispatch]);

//   return (
//     <>
//       <ToastContainer /> {/* Toast notifications */}
//       <> {/* Router wraps everything */}
//         <Routes> {/* Routes for different pages */}
//           <Route path="/" element={<MainLayout />}>
//             <Route index element={<Home />} />
//             <Route path="all-blogs" element={<AllBlogs />} />
//             <Route path="description/:id" element={<Description />} />
//             <Route path="cat/:id" element={<Categories />} />
//             <Route path="profile" element={<Profile />}>
//               <Route index element={<DashBoardProfile />} />
//               <Route path="favourites" element={<Favourites />} />
//               {/* <Route path="liked-blogs" element={<LikedBlogs />} /> */}
//             </Route>
//           </Route>
//           <Route element={<OtherLayout />}>
//             <Route path="login" element={<Login />} />
//             <Route path="signup" element={<SignUp />} />
//             <Route path="Admin-login" element={<AdminLogin />} />
//             <Route path="Admin-DashBoard" element={<AdmindashBoard />}>
//               <Route index element={<AdminDashboard />} />
//               <Route path="add-blogs" element={<AddBlogs />} />
//               <Route path="edit-blogs" element={<EditBlogs />} />
//               <Route path="update-blogs/:id" element={<UpdateBlog />} />
//             </Route>
//           </Route>
//         </Routes>
//       </>
//     </>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "./Store/authSlice";

import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Page";
import OtherLayout from "./Layout/OtherLayout";
import Login from "./Pages/Login/Login";
import SignUp from "./SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import AllBlogs from "./Pages/AllBlogs/Page";
import DashBoardProfile from "./components/Profile/DashBoardProfile";
import Favourites from "./components/Profile/Favourites";
import Description from "./Pages/Description/Description";
import Categories from "./Pages/Categories/Categories";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AdmindashBoard from "./Pages/AdminDashBoard/AdmindashBoard";
import AdminDashboard from "./components/AdminComponents/DashBoard/AdminDashboard";
import AddBlogs from "./components/AdminComponents/AddBlog/AddBlogs";
import EditBlogs from "./components/AdminComponents/EditBlog/EditBlogs";
import UpdateBlog from './components/AdminComponents/EditBlog/compo/UpdateBlog';

import ProtectedRoute from './components/Protec/ProtecteRouts';

const App = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.loginSuccess({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(`${backendLink}/api/v1/check-auth`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.data) {
            dispatch(authActions.loginSuccess({ token }));
          }
        }
      } catch (error) {
        if (error.response?.status === 403) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          dispatch(authActions.logout());
        } else {
          console.error("Error fetching auth status:", error);
        }
      }
    };

    fetchAuthStatus();
  }, [backendLink, dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/cat/:id" element={<Categories />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
            <Route index element={<DashBoardProfile />} />
            <Route path="/profile/favourites" element={<Favourites />} />
          </Route>
        </Route>
        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Admin-login" element={<AdminLogin />} />
          <Route path="/Admin-DashBoard" element={
            // <AminProtectedRoute>
            <AdmindashBoard />
            // </AminProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="/Admin-DashBoard/add-blogs" element={<AddBlogs />} />
            <Route path="/Admin-DashBoard/edit-blogs" element={<EditBlogs />} />
            <Route path="/Admin-DashBoard/update-blogs/:id" element={<UpdateBlog />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
