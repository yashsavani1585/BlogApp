import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './conn/Conn.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import AdminRouter from './Routes/Admin.js';
import userRouter from './Routes/User.js';
import CategoryRouter from './Routes/Category.js';
import BlogRouter from './Routes/Blog.js';

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// CORS configuration to allow only the frontend origin
const corsOptions = {
    origin: [
        'https://blog-ys.onrender.com',
    ],

};

app.use(cors(corsOptions));


// Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', AdminRouter);
app.use('/api/v1', CategoryRouter);
app.use('/api/v1', BlogRouter);

// Connect to DB and start server
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
