import React from 'react'
import BlogCard from '../../components/BlogCard/BlogCard'

const AllBlogs = ({data}) => {
  
  return (
    <div className='mb-4 py-4'>
      <h1 className='text-xl font-semibold mb-4'>All Blogs</h1>
      <div className='flex flex-col gap-8 lg:gap-12'>
        {data &&
          data.map((items, i) => (
            <div key={i} className='flex flex-col lg:flex-row gap-2 lg:gap-4 '>
              <BlogCard items={items} />

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllBlogs