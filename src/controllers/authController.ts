import { Request, Response } from 'express';
import { users } from '../data/mockData';

export const Login = (req: Request, res: Response) => {
  const { fullName, password } = req.body;

  const user = users.find(
    (u) => u.fullName === fullName && u.password === password
  );

  if (!user) {
    res.status(401).json({ error: 'אימייל או סיסמה שגויים' });
    return;
  }

  res.cookie('userId', user.id, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({
    message: 'התחברת בהצלחה',
    user: { id: user.id, fullName: user.fullName },
  });
};

export const Logout = (req: Request, res: Response) => {
  res.clearCookie('userId');
  res.json({ message: 'התנתקת בהצלחה' });
};
