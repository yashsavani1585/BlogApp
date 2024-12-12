import React from 'react'
import Header from '../../components/Home/Header'
import Categories from '../../components/Home/Categories'
import RecentBlogs from '../../components/Home/RecentBlogs'

const Home = () => {
  return (
    <div className='my-5'>
      <Header/>
      <Categories/>
      <RecentBlogs/>
    </div>
  )
}

export default Home