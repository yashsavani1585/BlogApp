import mongoose from 'mongoose';

// Define the schema directly
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin'],
    },
    avatar: {
      type: String,
      // default: '/default-avatar.jpg',  // Default avatar image path if needed
    },
    favoriteBlogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      default: [],  // Default to an empty array initially
    }],
    likedBlogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      default: [],  // Default to an empty array initially
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
