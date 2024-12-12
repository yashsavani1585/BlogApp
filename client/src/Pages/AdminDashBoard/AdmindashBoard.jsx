import React from 'react'
import SideBar from '../../components/AdminComponents/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const AdmindashBoard = () => {
  return (
    <div className='flex'>
      <div className='w-1/6'></div>
      <div className='w-1/6 fixed h-screen border-r'>
        <SideBar />
      </div>
      <div className='w-5/6 bg-zinc-200'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdmindashBoard;