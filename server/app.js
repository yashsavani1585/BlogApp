

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

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = [
  'http://localhost:5175',
  'http://localhost:5174',
  'https://blog-ys.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ API Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', AdminRouter);
app.use('/api/v1', CategoryRouter);
app.use('/api/v1', BlogRouter);

// ✅ Connect to DB and Start Server
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
