import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtUser } from '../types/index';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUser;
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET!;
    const user = jwt.verify(token, secret) as JwtUser;
    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.sendStatus(403);
    return;
  }
};
