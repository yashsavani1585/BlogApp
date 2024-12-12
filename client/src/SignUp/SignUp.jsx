import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import { useSelector } from 'react-redux'; // Import useSelector to get the backend URL from Redux

const SignUp = () => {
  const backendLink = useSelector((state) => state.prod.link); // Get the backend URL from Redux state

  const [Inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendLink}/api/v1/sign-up`, Inputs, {
        withCredentials: true,
      });
      console.log(res.data);
      toast.success('User signed up successfully!'); // Success toast
      navigate('/login');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        toast.error(error.response.data.error.message); // Error toast
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to signup. Please try again.');
      }
      console.error(error);
    } finally {
      setInputs({
        username: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className='h-screen flex items-center justify-center px-4'>
      <div className='p-6 md:p-12 shadow-2xl rounded w-full sm:w-[80%] md:w-[50%] lg:w-[40%] flex flex-col items-center justify-center'>
        <div className='text-xl md:text-2xl flex gap-2 text-center'>
          <h1 className='font-bold'>Welcome!</h1>
          <span>Signup as a new user</span>
        </div>
        <form onSubmit={submitHandler} className='flex flex-col w-full mt-6 md:mt-8'>
          <div className='flex flex-col mb-4'>
            <label className='text-sm md:text-lg mb-2'>Username</label>
            <input
              type='text'
              value={Inputs.username}
              name='username'
              className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300'
              required
              onChange={change}
            />
          </div>
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
            <button className='w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300'>
              Sign Up
            </button>
          </div>
        </form>
        <h4 className='mt-8'>
          Already have an account?
          <Link to='/login' className='text-blue-600 hover:text-blue-700 font-semibold'>
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SignUp;

