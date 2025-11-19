import { Request, Response, NextFunction } from 'express';

export const validateHealth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { babyId, type, value, notes, time } = req.body;

  if (!babyId) {
    res.status(400).json({ error: 'יש לשלוח מזהה תינוק (babyId)' });
    return;
  }

  // בדיקת סוג רשומה
  const validTypes = ['חום', 'תרופה', 'חיסון', 'בדיקה', 'תסמין'];

  if (!type || typeof type !== 'string' || !validTypes.includes(type)) {
    res.status(400).json({ error: 'סוג רשומה לא תקין או חסר' });
    return;
  }

  // בדיקות ספציפיות לפי סוג

  if (type === 'temperature') {
    if (value === undefined || typeof value !== 'number') {
      res.status(400).json({ error: 'חום גוף נדרש והוא חייב להיות מספר' });
      return;
    }

    if (value < 30 || value > 45) {
      res.status(400).json({ error: 'ערך חום לא תקין' });
      return;
    }
  }

  if (type === 'medicine') {
    if (!notes || typeof notes !== 'string' || notes.trim() === '') {
      res.status(400).json({ error: 'בעת תרופה חובה לציין שם התרופה (notes)' });
      return;
    }
  }

  if (type === 'vaccine') {
    if (!notes || typeof notes !== 'string' || notes.trim() === '') {
      res.status(400).json({ error: 'בעת חיסון חובה לציין שם החיסון (notes)' });
      return;
    }
  }

  if (type === 'checkup' && (!notes || notes.trim() === '')) {
    res
      .status(400)
      .json({ error: 'בעת בדיקה רפואית חובה לציין סוג בדיקה (notes)' });
    return;
  }

  if (type === 'symptom' && (!notes || notes.trim() === '')) {
    res.status(400).json({ error: 'בעת תסמין חובה לתאר את המצב (notes)' });
    return;
  }

  if (time && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'תאריך לא תקין' });
    return;
  }

  next();
};
