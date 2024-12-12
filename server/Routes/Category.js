import express from 'express';
import { addCategory, getBlogsByCategoryID, getCategory } from '../Controller/CategoryController.js';
import authMiddleware from '../middleware/Auth.js';

const CategoryRouter = express.Router();

CategoryRouter.post('/addCategory', 
    authMiddleware.verifyToken, 
    authMiddleware.authorizeRole("admin"), 
    addCategory 
);

CategoryRouter.get('/getCategory', 
    getCategory
);

CategoryRouter.get('/getBlogsByCategoryID/:id',
    // authMiddleware.verifyToken,
    // authMiddleware.authorizeRole("user"),  
    getBlogsByCategoryID
)

export default CategoryRouter;
