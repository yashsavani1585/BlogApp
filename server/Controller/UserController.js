import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const SignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
                const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = createToken(existingUser);

        res.cookie("BlogApp",token,{
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            httpOnly: true,
            secure: true, 
            sameSite: "none", 
        });
        res.status(201).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const createToken = (existingUser) => {
    return jwt.sign(
        {
            id: existingUser._id,
            email: existingUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null; // Invalid token
    }
};
export const checkAuth = (req, res) => {
    if (req.user) {
      res.json({ message: 'User is authenticated', user: req.user });
    } else {
      res.status(403).json({ error: 'User not authenticated' });
    }
  };
export const Logout = async (req, res) => {
    try {
        res.clearCookie("BlogApp", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none", 
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const getProfileData = (req, res) => {
    try {
        const user = req.user;
        const { password, ...safeUserData } = user._doc; 
        res.status(200).json({ data: safeUserData });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
export const ChangePassword = async (req, res) => {
    try {
        const user = req.user; 
        const { password, newPassword, confirmPassword } = req.body;

        if (!password || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const updateAvatar = async (req, res) => {
    try {
      const avatarUrl = req.file.path; 

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { avatar: avatarUrl },
        { new: true }
      );
      res.status(200).json({ message: 'Avatar updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating avatar', error });
    }
  };

  export const FavoriteBlogByUser = async (req, res) => {
    try {
      const user = req.user;
      
      // Check if the user and favoriteBlogs exist
      if (!user || !user.favoriteBlogs) {
        return res.status(400).json({ message: 'No favorite blogs found for the user' });
      }
      
      // Populate the user's favorite blogs
      const populatedUser = await User.findById(user._id).populate('favoriteBlogs');
      const favoriteBlogs = populatedUser.favoriteBlogs;
  
      // Send the response with favorite blogs
      return res.status(200).json({ success: true, favoriteBlogs });
    } catch (error) {
      console.error('Error retrieving favorite blogs:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
  
  