import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Description = () => {
  const { id } = useParams();
  const backendLink = useSelector((state) => state.prod.link);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!backendLink) {
        setError('Backend link is missing.');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required.');
          return;
        }
        const response = await axios.get(`${backendLink}/api/v1/fetchBlogById/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data.data);
        setIsLiked(response.data.favourite);
      } catch (err) {
        setError('Failed to fetch blog data.');
      }
    };
    fetchBlog();
  }, [id, backendLink]);

  const FavouriteHandler = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required.');
      return;
    }

    try {
      const url = `${backendLink}/api/v1/${isLiked ? 'removeBlogFromFavorite' : 'addBlogToFavorite'}/${id}`;
      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsLiked(!isLiked);
      toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      setError('Failed to update favorite status.');
      toast.error('Failed to update favorite status');
    }
  };

  if (!data && !error) return <p className="text-gray-500 text-center mt-4">Loading blog details...</p>;
  if (error) return <div className="text-red-500 bg-red-100 p-4 rounded">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Title and Favorite Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{data?.title}</h1>
        <button onClick={FavouriteHandler} className="text-2xl text-gray-500 hover:text-red-500">
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Blog Image */}
      <div className="w-full h-[200px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-md">
        <img
          className="w-full h-full object-cover"
          src={data?.image || 'fallback-image-url.jpg'}
          alt={data?.title || 'Blog image'}
        />
      </div>

      {/* Blog Description */}
      <p className="mt-6 text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
        {data?.description || 'Description not available.'}
      </p>
    </div>
  );
};

export default Description;
