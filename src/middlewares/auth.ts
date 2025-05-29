import { Request, Response, NextFunction } from 'express';
import { users } from '../data/mockData';
import { User } from '../types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.signedCookies.userId;

  if (!userId) {
    res.status(401).json({ error: 'לא מחובר' });
    return;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(401).json({ error: 'משתמש לא קיים' });
    return;
  }

  req.user = user;
  next();
};
