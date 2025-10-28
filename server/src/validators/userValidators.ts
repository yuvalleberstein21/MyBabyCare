import { Request, Response, NextFunction } from 'express';

export const validateUserFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, password } = req.body;

  if (
    !fullName ||
    typeof fullName !== 'string' ||
    fullName.trim().length < 2 ||
    !/^[a-zA-Z\u0590-\u05FF\s]+$/.test(fullName) // רק אותיות באנגלית ועברית
  ) {
    res.status(400).json({ error: 'יש להזין שם מלא תקין (אותיות בלבד)' });
    return;
  }

  if (
    !email ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    res.status(400).json({ error: 'יש להזין כתובת מייל תקינה' });
    return;
  }

  if (!password || typeof password !== 'string' || password.length < 4) {
    res.status(400).json({ error: 'הסיסמה חייבת להכיל לפחות 4 תווים' });
    return;
  }

  next();
};

export const validateLoginFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (
    !email ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    res.status(400).json({ error: 'יש להזין כתובת מייל תקינה' });
    return;
  }

  if (!password || typeof password !== 'string') {
    res.status(400).json({ error: 'יש להזין סיסמה' });
    return;
  }

  next();
};
