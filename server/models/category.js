import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }], // Add this to reference blog posts
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
