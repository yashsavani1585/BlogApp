import express from 'express';
import {
  fetchAllBlog,
  fetchRecentBlog,
  fetchBlogById,
  addBlogToFavorite,
  removeBlogFromFavorite,
  editBlog,
  deleteBlog,
} from '../Controller/BlogController.js';
import authMiddleware from '../middleware/Auth.js';

const BlogRouter = express.Router();

BlogRouter.get('/fetchAllBlogs', fetchAllBlog);
BlogRouter.get('/fetchRecentBlog', fetchRecentBlog);
BlogRouter.get('/fetchBlogById/:id', fetchBlogById);
BlogRouter.put(
  '/addBlogToFavorite/:id',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole('user'),
  addBlogToFavorite
);
BlogRouter.put('/removeBlogFromFavorite/:id',
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole('user'),
    removeBlogFromFavorite
)

BlogRouter.put('/editBlog/:id',
  // authMiddleware.verifyToken,
  // authMiddleware.authorizeRole('admin'),
  editBlog
)

BlogRouter.put('/deleteBlog/:id',
  // authMiddleware.verifyToken,
  // authMiddleware.authorizeRole('admin'),
  deleteBlog
)

export default BlogRouter;
