

// export default authMiddleware;
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

// Middleware for authentication and role-based authorization
const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1] || req.cookies.BlogApp; // Token from header or cookies

    if (!token) {
      console.log('No token provided');
      return res.status(403).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
      console.log('Decoded token:', decoded); // Log decoded token

      const user = await User.findById(decoded.id); // Fetch user from database
      if (!user) {
        console.log('User not found');
        return res.status(403).json({ message: 'User not found' });
      }

      req.user = user; // Attach user data to the request
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  },

  authorizeRole: (role) => {
    return (req, res, next) => {
      console.log(`User role: ${req.user.role}, Required role: ${role}`); // Log roles

      if (req.user.role !== role) {
        console.log('Role mismatch');
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  },
};

export default authMiddleware;
