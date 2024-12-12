import mongoose from 'mongoose';
import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
export const fetchAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const fetchRecentBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const fetchBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the Blog ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Blog ID" });
    }

    // Extract token from Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || req.cookies.BlogApp;

    if (!token) {
      return res.status(401).json({ error: "Authentication token missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the blog from the database
    const blog = await Blog.findById(id).populate("favoriteBlogByUser");
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if the blog is in the user's favorites
    let favourite = false;
    if (user && blog.favoriteBlogByUser.some((userId) => userId.equals(user._id))) {
      favourite = true;
    }

    // Respond with blog data and favorite status
    res.status(200).json({ success: true, data: blog, favourite });
  } catch (error) {
    console.error("Error fetching blog by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const addBlogToFavorite = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Ensure `req.user` is set by middleware
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Blog ID' });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if category exists (optional, but helpful)
    if (!blog.category) {
      return res.status(400).json({ message: 'Blog does not have a category assigned' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Avoid duplicates
    if (!blog.favoriteBlogByUser.includes(userId)) {
      blog.favoriteBlogByUser.push(userId);
      user.favoriteBlogs.push(blog._id);
    }

    await blog.save();
    await user.save();

    res.status(200).json({ success: true, message: 'Blog added to favorites.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const removeBlogFromFavorite = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Ensure `req.user` is set by middleware

  // Validate Blog ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Blog ID' });
  }

  try {
    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the blog from the user's favorite list if it exists
    const blogIndex = user.favoriteBlogs.indexOf(blog._id);
    if (blogIndex === -1) {
      return res.status(400).json({ message: 'Blog is not in your favorites' });
    }

    // Remove the blog from user's favorites and the blog's favorite list
    user.favoriteBlogs.splice(blogIndex, 1);
    const blogIndexInFavorite = blog.favoriteBlogByUser.indexOf(userId);
    if (blogIndexInFavorite !== -1) {
      blog.favoriteBlogByUser.splice(blogIndexInFavorite, 1);
    }

    // Save the updated documents
    await user.save();
    await blog.save();

    res.status(200).json({ success: true, message: 'Blog removed from favorites.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validate Blog ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Blog ID' });
    }

    // Find and update the blog, ensuring we return the updated document
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // This ensures the updated blog is returned
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message }); // Include the actual error message for debugging
  }
};


// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;


    // Find and delete the blog
    const blog = await Blog.findByIdAndDelete(id);
    
    // If no blog was found and deleted
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Success response
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

