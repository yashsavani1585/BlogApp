import mongoose from 'mongoose'; // Import mongoose
import { Category } from '../models/category.js';

// Add a category
export const addCategory = async (req, res) => {
    try {
        const { title } = req.body;

        // Check if the category already exists
        const checkCat = await Category.findOne({ title });
        if (checkCat) {
            return res.status(400).json({
                message: 'Category already exists',
                success: false,
            });
        }

        // Create new category
        const newCategory = new Category({ title });
        await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating category',
            success: false,
        });
    }
};

// Get all categories
export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        if (categories.length === 0) {
            return res.status(404).json({
                message: 'No categories found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Categories fetched successfully',
            success: true,
            categories, // Return the list of categories
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching categories',
            success: false,
            error: error.message,
        });
    }
};

// Get blogs by category ID
export const getBlogsByCategoryID = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from params

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid category ID',
                success: false,
            });
        }

        // Find the category by ID and populate its blogs
        const category = await Category.findById(id).populate("blogs");

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Category fetched successfully',
            success: true,
            blogs: category.blogs, // Return the blogs associated with the category
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({
            message: 'Error fetching categories',
            success: false,
            error: error.message,
        });
    }
};
