import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { Blog } from '../models/blog.js';
import { Category } from '../models/category.js';

// Helper function to generate token
const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin login controller
export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);

    res.cookie('BlogApp', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in AdminLogin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Blog creation controller
export const createBlog = async (req, res) => {
  const { title, description, category } = req.body;

  // Validate the incoming data
  if (!title || !description || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the category exists in the database
  const validCategory = await Category.findById(category);
  if (!validCategory) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    // Create the new blog entry
    const newBlog = new Blog({
      title,
      description,
      category,
      image: req.file.path, // Assuming image is uploaded via multer
    });

    await newBlog.save();
    validCategory.blogs.push(newBlog._id);
    await validCategory.save();

    // Return response
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
