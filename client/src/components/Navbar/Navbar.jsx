// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoReorderThree } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links = [
    { name: 'Home', to: '/' },
    { name: 'All Blogs', to: '/all-blogs' },
    { name: 'Profile', to: '/profile' },
    { name: 'Login', to: '/login' },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  // Access auth state from Redux

  // Modify the links based on login status
  if (!isLoggedIn) {
    links.splice(2, 1); // Remove Profile link if not logged in
  } else {
    links.splice(3, 1); // Remove Login link if logged in
  }

  const [mobileNav, setMobileNav] = useState(false);  // State for mobile menu toggle

  return (
    <nav className='relative flex items-center justify-between py-4 border-b border-zinc-200'>
      {/* Brand Name */}
      <div className='w-3/6 lg:w-2/6'>
        <Link to='/' className='text-xl font-bold'>BLOGGER</Link>
      </div>

      {/* Desktop Links */}
      <div className='w-4/6 hidden lg:flex items-center justify-end'>
        {links.map((item, i) => (
          <Link className='ms-4 hover:text-blue-600 transition-all duration-300' key={i} to={item.to}>{item.name}</Link>
        ))}
        {!isLoggedIn && <Link className='ms-4 bg-black rounded px-4 py-1 text-zinc-100 hover:bg-blue-600' to='/signup'>SignUp</Link>}
      </div>

      {/* Mobile Toggle Button */}
      <div className='w-3/6 flex lg:hidden items-center justify-end'>
        <button className='text-3xl' onClick={() => setMobileNav(!mobileNav)}>
          <IoReorderThree />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-white bg-opacity-90 z-50 p-8 transition-transform duration-300 ease-in-out ${mobileNav ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Close Button */}
        <div className='w-full flex justify-end'>
          <button className='text-3xl' onClick={() => setMobileNav(false)}>
            <RxCross2 />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className='h-full flex flex-col items-center justify-center'>
          {links.map((item, i) => (
            <Link className='mb-8 text-2xl hover:text-blue-600 transition-all duration-300' key={i} to={item.to} onClick={() => setMobileNav(false)}>
              {item.name}
            </Link>
          ))}
          {!isLoggedIn && <Link className='text-2xl bg-black rounded px-6 py-2 text-zinc-100 hover:bg-blue-600' to='/signup' onClick={() => setMobileNav(false)}>SignUp</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
