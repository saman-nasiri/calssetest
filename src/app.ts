const express = require('express');
const cors = require('cors');
const helmet = require('path');
const mongoose = require('mongoose');
const { connectDB } = require('./config/mongoose');
import { apiRateLimiter, loginRateLimiter } from './config/rateLimiter';
import { AppError, globalErrorHandler } from './utils/errorHandler';
// import { MONGO_URI } from './src/utils/constants';
import userRoutes from './routes/userRoutes';
import { MONGO_URI } from './utils/constants';
const dotenv = require('dotenv').config();

// Initialize Express app
const app = express();

// Setup middlewares for security
// app.use(helmet()); // Adds various security headers
app.use(cors()); // Enable CORS for all routes

// Parse incoming requests with JSON payloads
app.use(express.json());

// Apply general rate limiter to all routes
app.use(apiRateLimiter);

// Apply more stringent rate limiter to login route
app.use('/api/users/login', loginRateLimiter);


// Use routes
app.use('/api/users', userRoutes);

// If none of the above routes match, create a 404 error and forward it to the error handler
app.use('*', (req, res, next) => {
  next(new AppError('Not found', 404));
});

// Use the global error handler
app.use(globalErrorHandler);

// Connect to MongoDB and start the server
const startServer = async () => {

  // try {
  //   await mongoose.connect(MONGO_URI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //   });

  //   console.log('Database connected successfully');
  // } catch (error) {
  //   console.error('Database connection failed:', error);
  //   process.exit(1);
  // }
  connectDB();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// Start the server
startServer();
