// import React from 'react'
// import SideBar from '../../components/Profile/SideBar'
// import { BsArrowRight } from "react-icons/bs";
// import { Outlet } from 'react-router-dom'
// import { useState } from 'react';

// const Profile = () => {
//   const [sideBar, setSideBar] = useState(false);
//    return (
//     <div className='relative mb-4 py-4 flex item-start justify-between gap-8'>
//       <div className='bg-white h-screen lg:h-auto lg:block fixed top-0 left-0 w-[70%] flex flex-col items-center justify-center p-4 lg:p-0 border-r lg:relative lg:w-1/6'>
//       <SideBar/>
//       </div>
//       <div className='absolute top-0 left-0 lg:hidden'>
//         <button onClick={() => setSideBar(!sideBar)}>
//         <BsArrowRight className='text-2xl'/>{""}
//         </button>
//       </div>
//       <div className='w-full lg:w-5/6 max-h-auto min-h-screen'>
//         <Outlet/>
//       </div>
//     </div>
//   )
// }

// export default Profile

// import React, { useState } from 'react';
// import SideBar from '../../components/Profile/SideBar';
// import { Outlet } from 'react-router-dom';
// import { BsArrowRight } from "react-icons/bs";
// import { AiOutlineClose } from 'react-icons/ai';

// const Profile = () => {
//   const [sideBar, setSideBar] = useState(false);

//   return (
//     <div className='relative mb-4 py-4 flex items-start justify-between gap-8'>
//       {/* Sidebar */}
//       <div className={`bg-white h-screen lg:h-auto ${sideBar ? 'block' : 'hidden'} lg:block fixed top-0 left-0 w-[70%] lg:w-1/6 flex flex-col items-center justify-center p-4 lg:p-0 border-r lg:relative transition-transform duration-300 ease-in-out`}>
//         {/* Close (Cross) Button inside Sidebar for Mobile */}
//         <div className="absolute top-4 right-4 lg:hidden">
//           <button onClick={() => setSideBar(false)} className="text-2xl">
//             <AiOutlineClose /> {/* Cross Icon */}
//           </button>
//         </div>
//         <SideBar />
//       </div>

//       {/* Arrow Toggle Button for Mobile (only visible when sidebar is closed) */}
//       {!sideBar && (
//         <div className='absolute top-4 left-4 lg:hidden z-50'>
//           <button
//             onClick={() => setSideBar(true)}
//             className='flex items-center justify-center p-2 rounded-full bg-white shadow-lg'
//             style={{ marginTop: '1rem', marginLeft: '1rem' }} // Adds extra spacing
//           >
//             <BsArrowRight className="text-2xl" /> {/* Arrow Icon */}
//           </button>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className='w-full lg:w-5/6 max-h-auto min-h-screen'>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import SideBar from '../../components/Profile/SideBar';
import { Outlet } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';

const Profile = () => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div className="relative min-h-screen lg:flex lg:items-start mb-4 py-4">
      {/* Sidebar */}
      <div
        className={`bg-white h-screen lg:h-auto ${
          sideBar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:block fixed lg:relative top-0 left-0 w-[70%] lg:w-1/6 p-6 lg:p-4 shadow-xl transition-transform duration-300 ease-in-out transform z-40 rounded-r-lg`}
      >
        {/* Close Button inside Sidebar for Mobile */}
        <div className="absolute top-4 right-4 lg:hidden z-50">
          <button onClick={() => setSideBar(false)} className="text-2xl text-gray-600 hover:text-red-500 transition duration-200">
            <AiOutlineClose /> {/* Close Icon */}
          </button>
        </div>
        <SideBar />
      </div>

      {/* FAB for Opening Sidebar on Mobile */}
      {!sideBar && (
        <button
          onClick={() => setSideBar(true)}
          className="fixed bottom-4 left-4 p-3 rounded-full bg-blue-600 text-white shadow-lg lg:hidden z-50 hover:bg-blue-700 transition duration-200"
        >
          <BsArrowRight className="text-2xl" /> {/* Arrow Icon */}
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:w-5/6 p-4 lg:p-6 bg-gray-50 min-h-screen rounded-lg shadow-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
