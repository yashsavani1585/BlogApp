import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddBlogs = () => {
  const backendLink = useSelector((state) => state.prod.link); 
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [categories, setCategories] = useState(""); 
  const [categoryList, setCategoryList] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [categoriesId, setCategoriesId] = useState(null); 

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/getCategory`, {
          withCredentials: true,
        });
        setCategoryList(res.data.categories || []); 
      } catch (error) {
        console.error(error);
        setCategoryList([]); 
      }
    };
    fetchCategories();
  }, [backendLink]);

  // Handle blog submission
  const handleAddBlog = async (e) => {
    e.preventDefault();

    // Validation before submitting
    if (!title || !description || !categoriesId || !image) {
      toast.error("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("image", image);
      form.append("category", categoriesId); // Append the category ID to the form data

      const res = await axios.post(`${backendLink}/api/v1/addBlogs`, form, {
        withCredentials: true,
      });

      toast.success(res.data.message); // Show success message
      setTitle("");
      setDescription("");
      setImage(null);
      setSelectedCategory(""); // Reset selected category
      setCategoriesId(null); // Reset category ID
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage); // Show error message
    } finally {
      setLoading(false);
    }
  };

  // Handle category submission
  const addCategoryHandle = async (e) => {
    e.preventDefault();

    // Validation before submitting category
    if (!categories) {
      toast.error("Please enter a category name.");
      return;
    }

    try {
      setLoading(true);

      // Prepare category data
      const categoryData = {
        title: categories,
      };

      const res = await axios.post(
        `${backendLink}/api/v1/addCategory`,
        categoryData,
        { withCredentials: true }
      );

      toast.success(res.data.message); // Show success message
      setCategories(""); // Clear category input
      // fetchCategories(); // Refresh the category list after adding a new category
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto h-auto flex flex-col gap-8">
      {/* Add Blog Section */}
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Blog</h1>
        <form className="space-y-6" onSubmit={handleAddBlog}>
          <input
            type="text"
            placeholder="Title"
            className="outline-none p-3 bg-transparent text-lg border-b border-gray-400 w-full focus:border-blue-500 transition-colors duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="outline-none p-3 bg-transparent text-lg border-b border-gray-400 w-full focus:border-blue-500 transition-colors duration-200 h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="file"
              className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition duration-200"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value); // Update selected category
                setCategoriesId(e.target.value); // Update category ID
              }}
              className="px-4 py-2 rounded shadow w-full sm:w-auto"
            >
              <option value="">Select Category</option>
              {categoryList.map((item, i) => (
                <option value={item._id} key={i}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            {loading ? (
              <button
                type="button"
                className="bg-blue-600 text-lg text-white font-semibold rounded px-6 py-3 shadow-lg hover:bg-blue-700 transition duration-200 cursor-not-allowed"
                disabled
              >
                Adding Blog...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 text-lg text-white font-semibold rounded px-6 py-3 shadow-lg hover:bg-blue-700 transition duration-200"
              >
                Add Blog
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Add Category Section */}
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Category</h1>
        <form className="space-y-6" onSubmit={addCategoryHandle}>
          <input
            type="text"
            placeholder="Category Name"
            className="outline-none p-3 bg-transparent text-lg border-b border-gray-400 w-full focus:border-blue-500 transition-colors duration-200"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-lg text-white font-semibold rounded px-6 py-3 shadow-lg hover:bg-blue-700 transition duration-200"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;

