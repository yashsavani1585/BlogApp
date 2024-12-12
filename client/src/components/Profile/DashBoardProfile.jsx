// import React, { useState } from 'react';
// import { FaUser } from "react-icons/fa";
// const DashBoardProfile = () => {
//     const [ChangeAvatar, setChangeAvatar] = useState(null);

//     // Function to handle image change and display preview
//     const changeImage = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             setChangeAvatar(imageUrl);
//             console.log(file);
//         }
//     };

//     return (
//         <div className='flex flex-col'>
//             <div className='flex items-center gap-12'>
//                 {" "}
//                 <div>
//                     <div className='w-[20vh] h-[20vh] border rounded-full overflow-hidden'>
//                         <label
//                             className='w-[100%] h-[100%] flex items-center justify-center cursor-pointer'
//                             htmlFor="imgFile"
//                         >
//                             {ChangeAvatar ? (
//                                 <img src={ChangeAvatar} alt="Profile" className='w-full h-full object-cover' />
//                             ) : (
//                                 <FaUser className='w-[12vh] h-[12vh] text-zinc-600' />
//                             )}
//                         </label>
//                     </div>
//                     <div className='mt-4'>
//                         <input
//                             type='file'
//                             id='imgFile'
//                             accept='.jpeg, .jpg, .png'
//                             className='hidden'
//                             onChange={changeImage}
//                         />
//                         <button className='bg-zinc-800 hover:bg-blue-600 transition-all duration-300 text-center px-4 py-2 text-white rounded'>
//                             Change ChangeAvatar
//                         </button>
//                     </div>
//                 </div>
//                 <div>
//                     <p className='text-zinc-700'>yashsavani1585@gmail.com</p>
//                     <h1 className='text-5xl mt-2 font-semibold'>Yash Savani</h1>
//                 </div>
//             </div>
//             <hr className='my-8' />
//             <div>
//                 <h1 className='text-2xl font-semibold'>Change account's password</h1>
//                 <form action='' className='my-4'>
//                     <div className='flex flex-col mt-4'>
//                         <label htmlFor=''>Current Password</label>
//                         <input
//                             type='password'
//                             placeholder='Current Password'
//                             //value=""
//                             name='password'
//                             className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
//                             required
//                         //onChange={change}
//                         />
//                     </div>
//                     <div className='flex flex-col mt-4'>
//                         <label htmlFor=''>New Password</label>
//                         <input
//                             type='password'
//                             placeholder='New Password'
//                             //value=""
//                             name='newpassword'
//                             className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
//                             required
//                         //onChange={change}
//                         />
//                     </div>
//                     <div className='flex flex-col mt-4'>
//                         <label htmlFor=''>Confirm New Password</label>
//                         <input
//                             type='password'
//                             placeholder='Confirm New Password'
//                             //value=""
//                             name='confirmNewpassword'
//                             className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
//                             required
//                         //onChange={change}
//                         />
//                     </div>
//                     <div className='mt-8'>
//                         {" "}
//                         <button className='bg-zinc-800 hover:bg-blue-600 transition-all duration-300 text-center px-4 py-2 text-white rounded'>
//                             Update Password
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default DashBoardProfile;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashBoardProfile = () => {
    const backendLink = useSelector((state) => state.prod.link);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        avatar: null,
        username: '',
    });
    const [changeAvatar, setChangeAvatar] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const res = await axios.get(`${backendLink}/api/v1/getProfileData`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data && res.data.data) {
                    const { name, email, avatar, username } = res.data.data;
                    setUserData({ name, email, avatar, username });
                    dispatch(authActions.loginSuccess({ token }));
                } else {
                    throw new Error('Invalid response data');
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.error('Token expired, please log in again');
                    localStorage.removeItem('token');
                    dispatch(authActions.logout());
                    toast.error('Session expired, please log in again');
                } else {
                    console.error('Error fetching profile data:', error);
                    toast.error('Failed to load profile data. Please try again later.');
                }
            }
        };

        fetchProfileData();
    }, [backendLink, dispatch]);

    const changeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Local preview
            setChangeAvatar(file); // Store file for upload
            setUserData((prevData) => ({
                ...prevData,
                avatar: imageUrl
            }));
        }
    };

    const submitAvatarChange = async () => {
        if (changeAvatar) {
            const formData = new FormData();
            formData.append('avatar', changeAvatar);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`${backendLink}/api/v1/upload-avatar`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    setUserData((prevData) => ({
                        ...prevData,
                        avatar: response.data.user.avatar,
                    }));
                    toast.success('Avatar updated successfully');
                    setChangeAvatar(null); // Reset local preview
                }
            } catch (error) {
                toast.error('Failed to upload avatar. Please try again.');
            }
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const currentPassword = e.target.elements[0].value;
        const newPassword = e.target.elements[1].value;
        const confirmPassword = e.target.elements[2].value;

        try {
            const response = await axios.post(
                `${backendLink}/api/v1/change-password`,
                { password: currentPassword, newPassword, confirmPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                toast.success('Password updated successfully');
                e.target.reset();
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Error updating password');
            } else {
                console.error('Error updating password:', error);
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='flex flex-col w-full max-w-4xl mx-auto p-4'>
            <ToastContainer />
            <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
                <div>
                    <div className='w-[20vh] h-[20vh] border rounded-full overflow-hidden'>
                        <label className='w-full h-full flex items-center justify-center cursor-pointer' htmlFor="imgFile">
                            {userData.avatar ? (
                                <img src={userData.avatar} alt="Profile" className='w-full h-full object-cover' />
                            ) : (
                                <FaUser className='w-[12vh] h-[12vh] text-zinc-600' />
                            )}
                        </label>
                    </div>
                    <div className='mt-4'>
                        <input
                            type='file'
                            id='imgFile'
                            accept='.jpeg, .jpg, .png'
                            className='hidden'
                            onChange={changeImage}
                        />
                        <button
                            onClick={() => document.getElementById('imgFile').click()}
                            className='bg-zinc-800 hover:bg-blue-600 transition-all duration-300 text-center px-4 py-2 text-white rounded'
                        >
                            Change Avatar
                        </button>
                        {changeAvatar && (
                            <button
                                onClick={submitAvatarChange}
                                className='mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                            >
                                Submit Avatar Change
                            </button>
                        )}
                    </div>
                </div>
                <div className='text-center md:text-left'>
                    <p className='text-black font-semibold text-lg md:text-xl'>{userData.email}</p>
                    <h1 className='text-black text-3xl md:text-5xl mt-2 font-semibold'>{userData.name}</h1>
                    <p className='text-black font-semibold text-4xl md:text-5xl'>{userData.username}</p>
                </div>
            </div>

            <hr className='my-8' />

            <div>
                <h1 className='text-2xl font-semibold'>Change Account's Password</h1>
                <form onSubmit={handlePasswordUpdate} className='my-4'>
                    <div className='flex flex-col mt-4'>
                        <label>Current Password</label>
                        <input
                            type='password'
                            placeholder='Current Password'
                            className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
                            required
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label>New Password</label>
                        <input
                            type='password'
                            placeholder='New Password'
                            className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
                            required
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label>Confirm New Password</label>
                        <input
                            type='password'
                            placeholder='Confirm New Password'
                            className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
                            required
                        />
                    </div>
                    <div className='mt-8'>
                        <button type='submit' className='bg-zinc-800 hover:bg-blue-600 transition-all duration-300 text-center px-4 py-2 text-white rounded'>
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashBoardProfile;
