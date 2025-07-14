import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/generateTokens';
import {
  AuthResponse,
  JwtUser,
  LoginRequestBody,
  RegisterRequestBody,
} from '../types/user';
import { setAccessTokenCookie, setAuthCookies } from '../utils/cookieOptions';

export const Login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response<AuthResponse | { error: string }>
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: 'אימייל או סיסמה שגויים' });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ error: 'אימייל או סיסמה שגויים' });
      return;
    }

    const payload: JwtUser = { id: user._id.toString(), name: user.fullName };
    const { accessToken, refreshToken } = generateTokens(payload);

    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      success: true,
      message: 'התחברת בהצלחה',
      user: {
        id: user._id.toString(),
        name: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('שגיאה ב-login:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const Register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response<AuthResponse | { error: string }>
) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('exists');
      res.status(409).json({ error: 'משתמש כבר קיים במערכת' });
      return;
    }

    const newUser = new User({
      fullName,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'נרשמת בהצלחה',
      user: {
        id: newUser._id.toString(),
        name: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('שגיאה ב-register:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const Logout: RequestHandler = (req, res): void => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'התנתקת בהצלחה' });
};

export const refreshAccessToken: RequestHandler = (req, res): void => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ error: 'אין refresh token' });
    return;
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtUser;

    const payload: JwtUser = { id: decoded.id, name: decoded.name };
    const { accessToken } = generateTokens(payload);

    setAccessTokenCookie(res, accessToken);

    res.json({ success: true, accessToken });
  } catch (error) {
    console.error('שגיאה ב-refresh token:', error);
    res.status(403).json({ error: 'refresh token לא תקין או פג תוקף' });
  }
};
