import { Request, Response, NextFunction } from 'express';

// Normalize user registration data
export const normalizeRegisterData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    if (typeof req.body.username === 'string') {
      req.body.username = req.body.username.trim().toLowerCase();
    }
    if (typeof req.body.email === 'string') {
      req.body.email = req.body.email.trim().toLowerCase();
    }
    if (typeof req.body.password === 'string') {
      req.body.password = req.body.password.trim(); // Do not change the case of the password
    }
  }
  next();
};

// Normalize user login data
export const normalizeLoginData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    if (typeof req.body.email === 'string') {
      req.body.email = req.body.email.trim().toLowerCase();
    }
    if (typeof req.body.password === 'string') {
      req.body.password = req.body.password.trim(); // Do not change the case of the password
    }
  }
  next();
};
