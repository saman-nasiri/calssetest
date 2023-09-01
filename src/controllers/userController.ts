import { Request, Response } from 'express';
const bcrypt =require('bcryptjs');
import jwt = require('jsonwebtoken');
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10), // hash password
    });

    
    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: 3600, // 1 hour
    });
    
    await user.save();
    
    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: 3600, // 1 hour
    });

    res.status(200).json({
      message: 'Logged in successfully',
      token,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    // The user ID is taken from the JWT payload
    const userId = req.user!.id;

    // Fetch user information, excluding the password
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
