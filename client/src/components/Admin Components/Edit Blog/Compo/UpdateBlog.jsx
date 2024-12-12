import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateBlog = () => {
    const [data, setData] = useState({ title: "", description: "" });
    const { id } = useParams();
    const backendLink = useSelector((state) => state.prod.link);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${backendLink}/api/v1/fetchBlogById/${id}`, {
                    withCredentials: true,
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };
        fetchBlog();
    }, [id, backendLink]);

    const ChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const UpdateHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${backendLink}/api/v1/editBlog/${id}`,
                data, {
                    withCredentials: true,
                });
            toast.success(response.data.message);
            setData(response.data.data);

            // Navigate to Admin-DashBoard after successful update
            // navigate('admin-dashboard'); // Adjust the route based on your setup

        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    return (
        <div className='p-6 max-w-xl mx-auto h-screen'>
            <h1 className="text-3xl font-bold mb-6 text-center">Update Blog</h1>
            {
                data && <form action="" className="space-y-6">
                    <input
                        type="text"
                        placeholder="Title"
                        className="outline-none p-3 bg-transparent text-2xl border-b border-zinc-400 w-full font-semibold focus:border-blue-500 transition-colors duration-200"
                        name='title'
                        value={data.title}
                        onChange={ChangeHandler}
                    />

                    <textarea
                        placeholder="Description"
                        className="outline-none p-3 bg-transparent text-lg border-b border-zinc-400 w-full font-medium placeholder-gray-500 focus:border-blue-500 transition-colors duration-200 h-40 resize-none"
                        name='description'
                        value={data.description}
                        onChange={ChangeHandler}
                    />

                    <div className="flex items-center justify-center">
                        <input
                            type="file"
                            className="bg-zinc-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-zinc-700 transition-colors duration-200"
                            accept=".jpeg, .png, .jpg"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-blue-600 text-xl text-white font-semibold rounded px-6 py-3 shadow-lg hover:bg-blue-700 transition duration-200"
                            onClick={UpdateHandler}
                        >
                            Update Blog
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}

export default UpdateBlog;
