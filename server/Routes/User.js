import express from 'express';
import {
  checkAuth,
  getProfileData,
  Login,
  Logout,
  SignUp,
  ChangePassword,
  updateAvatar,
  FavoriteBlogByUser,
} from '../Controller/UserController.js';
import authMiddleware from '../middleware/Auth.js';
import upload from '../middleware/imageUpload.js'

const userRouter = express.Router();

userRouter.post('/sign-up', SignUp);
userRouter.post('/login', Login);
userRouter.get('/check-auth', authMiddleware.verifyToken, checkAuth);
userRouter.post('/logout', Logout);
userRouter.get('/getProfileData', authMiddleware.verifyToken,
  authMiddleware.authorizeRole('user'),
  getProfileData);
userRouter.post('/change-password',
  authMiddleware.verifyToken,
  ChangePassword);
userRouter.put(
  '/upload-avatar',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole('user'),
  upload.single('avatar'),
  updateAvatar
);
userRouter.put('/admin-dashboard',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole('admin'), (req, res) => {
    res.send('Welcome to the Admin Dashboard');
  });
userRouter.get('/FavoriteBlogByUser', 
  authMiddleware.verifyToken, authMiddleware.authorizeRole('user'),
   FavoriteBlogByUser);

export default userRouter;
