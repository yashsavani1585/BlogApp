// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/authSlice';  // Updated import

const Login = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendLink}/api/v1/login`, Inputs, {
        withCredentials: true,
      });
      // Dispatching loginSuccess action after successful login
      dispatch(authActions.loginSuccess({ token: res.data.token })); // Use loginSuccess from authAction
      toast.success('User logged in successfully!');
      navigate('/profile');
    } catch (error) {
      let errorMessage = 'Failed to log in. Please try again.';
      if (error.response) {
        if (error.response.data && error.response.data.error && error.response.data.error.message) {
          errorMessage = error.response.data.error.message;
        } else {
          errorMessage = 'An error occurred on the server.';
        }
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="p-6 md:p-12 shadow-2xl rounded w-full sm:w-[80%] md:w-[50%] lg:w-[40%] flex flex-col items-center justify-center">
        <div className="text-xl md:text-2xl flex gap-2 text-center">
          <h1 className="font-bold">Welcome Again!</h1>
          <span>Please Login Here</span>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col w-full mt-6 md:mt-8">
          <div className="flex flex-col mb-4">
            <label className="text-sm md:text-lg mb-2">Email</label>
            <input
              type="email"
              value={Inputs.email}
              name="email"
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300"
              required
              title="Please enter a valid email address."
              onChange={change}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm md:text-lg mb-2">Password</label>
            <input
              type="password"
              value={Inputs.password}
              name="password"
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400 focus:border-blue-500 transition-all duration-300"
              required
              minLength="6"
              onChange={change}
            />
          </div>
          <div className="flex mt-4">
            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <h4 className="mt-8">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
            SignUp
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
