import { Request, Response } from 'express';
import { users } from '../data/mockData';
import { User } from '../models/userModel';

export const Login = (req: Request, res: Response) => {
  (async () => {
    await User.create({
      fullName: 'Example User',
      email: 'example1@example.com',
      password: 'password123',
    });
  })();
  // const { fullName, password } = req.body;

  // const user = users.find(
  //   (u) => u.fullName === fullName && u.password === password
  // );

  // if (!user) {
  //   res.status(401).json({ error: 'אימייל או סיסמה שגויים' });
  //   return;
  // }

  // res.cookie('userId', user.id, {
  //   httpOnly: true,
  //   signed: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict',
  // });

  // res.json({
  //   message: 'התחברת בהצלחה',
  //   user: { id: user.id, fullName: user.fullName },
  // });
};

export const Logout = (req: Request, res: Response) => {
  res.clearCookie('userId');
  res.json({ message: 'התנתקת בהצלחה' });
};
