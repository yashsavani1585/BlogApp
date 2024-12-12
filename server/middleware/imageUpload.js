// In cloudinary.js or upload.js
// import multer from 'multer';
// import { storage } from '../Utils/cloudinary.js'; 
// const upload = multer({ storage });
// export default upload;

import multer from 'multer';
import { storage } from '../Utils/cloudinary.js';  // Correct import
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Multer upload configuration
const upload = multer({ storage });

export default upload;
