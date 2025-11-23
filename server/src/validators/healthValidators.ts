import { Request, Response, NextFunction } from 'express';

export const validateHealth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, value, notes, time } = req.body;

  // בדיקת סוג רשומה
  const validTypes = ['חום', 'תרופה', 'חיסון', 'בדיקה', 'תסמין'];

  if (!type || typeof type !== 'string' || !validTypes.includes(type)) {
    res.status(400).json({ error: 'סוג רשומה לא תקין או חסר' });
    return;
  }

  // בדיקות ספציפיות לפי סוג

  if (type === 'חום') {
    if (value === undefined || typeof value !== 'number') {
      res.status(400).json({ error: 'חום גוף נדרש והוא חייב להיות מספר' });
      return;
    }

    if (value < 30 || value > 45) {
      res.status(400).json({ error: 'ערך חום לא תקין' });
      return;
    }
  }

  if (type === 'תרופה') {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      res.status(400).json({ error: 'בעת תרופה חובה לציין שם התרופה' });
      return;
    }
  }

  if (type === 'חיסון') {
    if (!notes || typeof value !== 'string' || value.trim() === '') {
      res.status(400).json({ error: 'בעת חיסון חובה לציין שם החיסון' });
      return;
    }
  }

  if (type === 'בדיקה' && (!value || value.trim() === '')) {
    res.status(400).json({ error: 'בעת בדיקה רפואית חובה לציין סוג בדיקה' });
    return;
  }

  if (type === 'תסמין' && (!value || value.trim() === '')) {
    res.status(400).json({ error: 'בעת תסמין חובה לתאר את המצב' });
    return;
  }

  if (time && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'תאריך לא תקין' });
    return;
  }

  next();
};
