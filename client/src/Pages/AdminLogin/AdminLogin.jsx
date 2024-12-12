import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const navigate = useNavigate();
    const backendLink = useSelector((state) => state.prod.link); // Get backend URL from Redux state

    const [Inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${backendLink}/api/v1/adminLogin`, Inputs, {
                withCredentials: true,
            });
            // localStorage.setItem('adminToken', res.data.token); // Store the admin token in localStorage
            console.log(res);
            toast.success('Admin logged in successfully!');
            navigate('/Admin-DashBoard');
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div className='h-screen flex items-center justify-center px-4'>
            <div className='p-6 md:p-12 shadow-2xl rounded w-full sm:w-[80%] md:w-[50%] lg:w-[40%] flex flex-col items-center justify-center'>
                <div className='text-xl md:text-2xl flex gap-2 text-center'>
                    <h1 className='font-bold'>Admin Login!</h1>
                    <span>Please Login Here</span>
                </div>
                <form onSubmit={handleAdminLogin} className='flex flex-col w-full mt-6 md:mt-8'>
                    <div className='flex flex-col mb-4'>
                        <label className='text-sm md:text-lg mb-2'>Email</label>
                        <input
                            type='email'
                            value={Inputs.email}
                            name='email'
                            className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
                            required
                            onChange={change}
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label className='text-sm md:text-lg mb-2'>Password</label>
                        <input
                            type='password'
                            value={Inputs.password}
                            name='password'
                            className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
                            required
                            onChange={change}
                        />
                    </div>
                    <div className='flex mt-4'>
                        <button
                            className='w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
