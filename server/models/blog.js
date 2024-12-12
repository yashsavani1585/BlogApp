import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or file path
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Ensure you have a `Category` model if used
      required: true,
    },
    favoriteBlogByUser:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    ],
    likedBlogByUser:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    ]
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
