import express from 'express';
import { AdminLogin, createBlog } from '../Controller/AdminController.js';
import authMiddleware from '../middleware/Auth.js';
import upload from '../middleware/imageUpload.js';

const AdminRouter = express.Router();

// Admin login route
AdminRouter.post('/adminLogin', AdminLogin);

// Blog creation route
AdminRouter.post(
  '/addBlogs',
  // authMiddleware.verifyToken, // Token verification
  // authMiddleware.authorizeRole('admin'), // Role-based authorization
  upload.single('image'), // Single image upload middleware
  createBlog // Blog creation controller
);

export default AdminRouter;
