import { Request, Response, NextFunction } from 'express';
import jwt =require('jsonwebtoken');

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: UserPayload) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      // Attach user to request object
      req.user = user as UserPayload;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
