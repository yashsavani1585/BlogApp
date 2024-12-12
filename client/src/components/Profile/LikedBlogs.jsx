import React from 'react'
import BlogCard from '../BlogCard/BlogCard'
const data = [
    {
        img: "../Temp.jpeg",
        title: "Chilling Breeze of Autumn",
        description: "A serene moment capturing the gentle transition of seasons as the crisp autumn air envelops the surroundings, inviting a peaceful calm",
    },
    {
        img: "../Temp.jpeg",
        title: "Chilling Breeze of Autumn",
        description: "A serene moment capturing the gentle transition of seasons as the crisp autumn air envelops the surroundings, inviting a peaceful calm",
    },
    {
        img: "../Temp.jpeg",
        title: "Chilling Breeze of Autumn",
        description: "A serene moment capturing the gentle transition of seasons as the crisp autumn air envelops the surroundings, inviting a peaceful calm",
    },
    {
        img: "../Temp.jpeg",
        title: "Chilling Breeze of Autumn",
        description: "A serene moment capturing the gentle transition of seasons as the crisp autumn air envelops the surroundings, inviting a peaceful calm",
    }
];

const LikedBlogs = () => {
  
  return (
    <div className=''>
    <h1 className='text-xl font-semibold mb-4'>Liked-Blogs</h1>
    <div className='flex flex-col gap-8 lg:gap-4'>
        {data &&
            data.map((items, i) => (
                <div key={i} className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
                    <BlogCard items={items} />

                </div>
            ))
        }
    </div>
</div>

  )
}

export default LikedBlogs