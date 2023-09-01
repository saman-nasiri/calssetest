import express = require('express');
import * as userController from '../controllers/userController';
import { authenticateJWT } from '../middlewares/auth';
import { normalizeRegisterData, normalizeLoginData } from '../middlewares/normalizeInput';
import { validateRegisterInput, validateLoginInput } from '../middlewares/validateInput'; // Hypothetical middleware for input validation

const router = express.Router();

// User Registration
router.post('/register', 
  normalizeRegisterData, 
  validateRegisterInput, // Replace with your actual validation logic
  userController.register
);

// User Login
router.post('/login', 
  normalizeLoginData, 
  validateLoginInput, // Replace with your actual validation logic
  userController.login
);

// Fetch User Info (Authenticated)
router.get('/me', 
  authenticateJWT, 
  userController.getUserInfo
);

export default router;
